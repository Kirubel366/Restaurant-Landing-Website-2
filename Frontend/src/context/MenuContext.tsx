import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MenuItem, Category } from "@/lib/menuData";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface MenuContextType {
  menuItems: MenuItem[];
  categories: Category[];
  initialLoading: boolean;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  toggleAvailability: (id: string) => Promise<void>;
  addCategory: (label: string, description?: string) => Promise<void>;
  updateCategory: (
    id: string,
    label: string,
    description?: string
  ) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  fetchInitialData: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// --- HELPER MAPPERS ---
const mapItem = (item: any): MenuItem => ({
  id: item._id,
  name: item.name,
  price: item.price,
  categoryId: item.categoryId,
  description: item.description || "",
  available: item.available,
});

const mapCategory = (cat: any): Category => ({
  id: cat._id,
  value: cat.value,
  label: cat.label,
  description: cat.description || "",
});

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchInitialData = async () => {
    try {
      const [categoriesRes, menuItemsRes] = await Promise.all([
        axiosInstance.get("/categories"),
        axiosInstance.get("/menuitems"),
      ]);

      setCategories(categoriesRes.data.map(mapCategory));
      setMenuItems(menuItemsRes.data.map(mapItem));
    } catch (err) {
      console.error("Error fetching initial data:", err);
      toast.error("Failed to load menu data");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    const promise = axiosInstance.post("/menuitems", item).then((res) => {
      const newItem = mapItem(res.data);
      setMenuItems((prev) => [...prev, newItem]);
      return newItem;
    });

    toast.promise(promise, {
      loading: "Adding item...",
      success: (data) => `${data.name} added to menu`,
      error: "Failed to add item",
    });
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    const promise = axiosInstance
      .put(`/menuitems/${id}`, updates)
      .then((res) => {
        const updatedItem = mapItem(res.data);
        setMenuItems((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );
        return updatedItem;
      });

    // Only show toast if it's a full edit (not just a toggle)
    if (Object.keys(updates).length > 1) {
      toast.promise(promise, {
        loading: "Updating item...",
        success: "Changes saved",
        error: "Failed to update item",
      });
    } else {
      try {
        await promise;
      } catch (e) {
        toast.error("Update failed");
      }
    }
  };

  const deleteMenuItem = async (id: string) => {
    const promise = axiosInstance.delete(`/menuitems/${id}`).then(() => {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    });

    toast.promise(promise, {
      loading: "Deleting item...",
      success: "Item removed",
      error: "Could not delete item",
    });
  };

  const toggleAvailability = async (id: string) => {
    const item = menuItems.find((i) => i.id === id);
    if (!item) return;

    const newStatus = !item.available;

    // Optimistic UI update for immediate feedback
    setMenuItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: newStatus } : i))
    );

    try {
      await axiosInstance.put(`/menuitems/${id}`, { available: newStatus });
      toast.success(
        newStatus ? "Item is now available" : "Item marked as Sold Out"
      );
    } catch (err) {
      // Rollback on error
      setMenuItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, available: !newStatus } : i))
      );
      toast.error("Failed to update status");
    }
  };

  const addCategory = async (label: string, description?: string) => {
    const value = label.toLowerCase().replace(/\s+/g, "-");
    const promise = axiosInstance
      .post("/categories", { label, value, description })
      .then((res) => {
        const newCat = mapCategory(res.data);
        setCategories((prev) => [...prev, newCat]);
        return newCat;
      });

    toast.promise(promise, {
      loading: "Creating category...",
      success: (data) => `Category "${data.label}" created`,
      error: "Failed to create category",
    });
  };

  const updateCategory = async (
    id: string,
    label: string,
    description?: string
  ) => {
    const value = label.toLowerCase().replace(/\s+/g, "-");
    const promise = axiosInstance
      .put(`/categories/${id}`, { label, value, description })
      .then((res) => {
        const updatedCat = mapCategory(res.data);
        setCategories((prev) =>
          prev.map((cat) => (cat.id === id ? updatedCat : cat))
        );
      });

    toast.promise(promise, {
      loading: "Updating category...",
      success: "Category updated",
      error: "Failed to update category",
    });
  };

  const deleteCategory = async (id: string) => {
    const promise = axiosInstance.delete(`/categories/${id}`).then(() => {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setMenuItems((prev) => prev.filter((item) => item.categoryId !== id));
    });

    toast.promise(promise, {
      loading: "Deleting category...",
      success: "Category removed",
      error: "Could not delete category",
    });
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        categories,
        initialLoading,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability,
        addCategory,
        updateCategory,
        deleteCategory,
        fetchInitialData,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within a MenuProvider");
  return context;
}
