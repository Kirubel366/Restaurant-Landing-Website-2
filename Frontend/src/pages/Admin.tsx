import { useState, useEffect, useRef } from "react";
import { useMenu } from "@/context/MenuContext";
import { useSettings } from "@/context/SettingsContext";
import { formatPrice, MenuItem, Category } from "@/lib/menuData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSearchParams, Navigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  ChefHat,
  Sun,
  Utensils,
  Moon,
  Coffee,
  Cake,
  Settings,
  Package,
  FolderPlus,
  Tag,
  Video,
  FileText,
  ToggleLeft,
  Check,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const defaultCategoryIcons: Record<string, React.ElementType> = {
  breakfast: Sun,
  lunch: Utensils,
  dinner: Moon,
  drinks: Coffee,
  desserts: Cake,
};

function getCategoryIcon(value: string): React.ElementType {
  return defaultCategoryIcons[value] || Tag;
}

type ModalType = "item" | "category" | null;

export default function Admin() {
  const [searchParams] = useSearchParams();
  const accessKey = searchParams.get("key");
  const SECRET_KEY = import.meta.env.VITE_ADMIN_ACCESS_KEY;

  // 1. Check for the Secret Key first
  if (accessKey !== SECRET_KEY) {
    return <Navigate to="/404" replace />;
  }
  const {
    menuItems,
    categories,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useMenu();

  const {
    itemDescriptionsEnabled,
    updateItemDescriptions,
    categoryDescriptionsEnabled,
    updateCategoryDescriptions,
    videoEnabled,
    updateVideoStatus,
    pendingVideoUrl,
    setPendingVideoUrl,
    videoSubmitted,
    submitVideo,
    videoLoading,
  } = useSettings();

  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<
    "items" | "categories" | "settings"
  >("items");
  const listRef = useRef<HTMLUListElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Form state for items
  const [itemFormData, setItemFormData] = useState({
    name: "",
    price: "",
    categoryId: categories[0]?.id || "",
    description: "",
  });

  // Form state for categories
  const [categoryFormData, setCategoryFormData] = useState({
    label: "",
    description: "",
  });

  const filteredItems =
    filterCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.categoryId === filterCategory);

  // Animate items on filter change
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll(".admin-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" }
    );
  }, [filterCategory, activeTab]);

  // Animate modal
  useEffect(() => {
    if (modalType && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
    }
  }, [modalType]);

  const resetItemForm = () => {
    setItemFormData({
      name: "",
      price: "",
      categoryId: categories[0]?.id || "",
      description: "",
    });
    setEditingItem(null);
    setModalType(null);
  };

  const resetCategoryForm = () => {
    setCategoryFormData({ label: "", description: "" });
    setEditingCategory(null);
    setModalType(null);
  };

  const handleItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(itemFormData.price);
    if (!itemFormData.name.trim() || isNaN(price) || price <= 0) {
      return;
    }

    if (editingItem) {
      updateMenuItem(editingItem.id, {
        name: itemFormData.name.trim(),
        price,
        categoryId: itemFormData.categoryId,
        description: itemDescriptionsEnabled
          ? itemFormData.description.trim()
          : undefined,
      });
    } else {
      addMenuItem({
        name: itemFormData.name.trim(),
        price,
        categoryId: itemFormData.categoryId,
        description: itemDescriptionsEnabled
          ? itemFormData.description.trim()
          : undefined,
        available: true,
      });
    }

    resetItemForm();
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryFormData.label.trim()) {
      return;
    }

    if (editingCategory) {
      updateCategory(
        editingCategory.id,
        categoryFormData.label.trim(),
        categoryDescriptionsEnabled
          ? categoryFormData.description.trim()
          : undefined
      );
    } else {
      addCategory(
        categoryFormData.label.trim(),
        categoryDescriptionsEnabled
          ? categoryFormData.description.trim()
          : undefined
      );
    }

    resetCategoryForm();
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemFormData({
      name: item.name,
      price: item.price.toString(),
      categoryId: item.categoryId,
      description: item.description || "",
    });
    setModalType("item");
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryFormData({
      label: category.label,
      description: category.description || "",
    });
    setModalType("category");
  };

  const handleDeleteItem = (id: string) => {
    deleteMenuItem(id);
  };

  const handleDeleteCategory = (id: string) => {
    const itemsInCategory = menuItems.filter(
      (item) => item.categoryId === id
    ).length;
    if (itemsInCategory > 0) {
      toast.error(
        `Cannot delete: ${itemsInCategory} ${
          itemsInCategory === 1 ? "item" : "items"
        } in this category. Delete or move ${
          itemsInCategory === 1 ? "item" : "items"
        } first.`
      );
      return;
    }
    deleteCategory(id);
    if (filterCategory === id) {
      setFilterCategory("all");
    }
  };

  const openItemModal = () => {
    resetItemForm();
    setModalType("item");
  };

  const openCategoryModal = () => {
    resetCategoryForm();
    setModalType("category");
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--gradient-warm)" }}
    >
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                aria-label="Back to site"
              >
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="icon-container w-10 h-10">
                  <Settings className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-serif text-xl font-semibold">
                    Menu Management
                  </h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Manage items, categories & settings
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button
                variant="outline"
                onClick={openCategoryModal}
                className="gap-2"
              >
                <FolderPlus size={18} />
                <span className="hidden sm:inline">Add Category</span>
              </Button>
              <Button onClick={openItemModal} className="gap-2">
                <Plus size={18} />
                <span className="hidden sm:inline">Add Item</span>
              </Button>
            </div>
          </div>
          {/* Mobile buttons row */}
          <div className="flex gap-2 mt-3 sm:hidden">
            <Button
              variant="outline"
              onClick={openCategoryModal}
              className="gap-2 flex-1"
            >
              <FolderPlus size={18} />
              Add Category
            </Button>
            <Button onClick={openItemModal} className="gap-2 flex-1">
              <Plus size={18} />
              Add Item
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Modal */}
        {modalType && (
          <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {modalType === "item" ? (
                <>
                  <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="icon-container w-10 h-10">
                        <ChefHat className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h2 className="font-serif text-xl">
                        {editingItem ? "Edit Item" : "Add New Item"}
                      </h2>
                    </div>
                    <button
                      onClick={resetItemForm}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleItemSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        value={itemFormData.name}
                        onChange={(e) =>
                          setItemFormData({
                            ...itemFormData,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g., Grilled Salmon"
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (ETB)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={itemFormData.price}
                        onChange={(e) =>
                          setItemFormData({
                            ...itemFormData,
                            price: e.target.value,
                          })
                        }
                        placeholder="e.g., 500"
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={itemFormData.categoryId}
                        onValueChange={(value) =>
                          setItemFormData({
                            ...itemFormData,
                            categoryId: value,
                          })
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => {
                            const Icon = getCategoryIcon(cat.value);
                            return (
                              <SelectItem key={cat.id} value={cat.id}>
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4" />
                                  {cat.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {itemDescriptionsEnabled && (
                      <div className="space-y-2">
                        <Label htmlFor="itemDescription">
                          Description (optional)
                        </Label>
                        <Textarea
                          id="itemDescription"
                          value={itemFormData.description}
                          onChange={(e) =>
                            setItemFormData({
                              ...itemFormData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe this menu item..."
                          className="min-h-[100px] resize-none"
                          maxLength={300}
                        />
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetItemForm}
                        className="flex-1 h-12"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1 h-12">
                        {editingItem ? "Save Changes" : "Add Item"}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="icon-container w-10 h-10">
                        <FolderPlus className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h2 className="font-serif text-xl">
                        {editingCategory ? "Edit Category" : "Add New Category"}
                      </h2>
                    </div>
                    <button
                      onClick={resetCategoryForm}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form
                    onSubmit={handleCategorySubmit}
                    className="p-6 space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="categoryLabel">Category Name</Label>
                      <Input
                        id="categoryLabel"
                        value={categoryFormData.label}
                        onChange={(e) =>
                          setCategoryFormData({
                            ...categoryFormData,
                            label: e.target.value,
                          })
                        }
                        placeholder="e.g., Specials"
                        className="h-12"
                        required
                      />
                    </div>

                    {categoryDescriptionsEnabled && (
                      <div className="space-y-2">
                        <Label htmlFor="categoryDescription">
                          Description (optional)
                        </Label>
                        <Textarea
                          id="categoryDescription"
                          value={categoryFormData.description}
                          onChange={(e) =>
                            setCategoryFormData({
                              ...categoryFormData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe this category..."
                          className="min-h-[100px] resize-none"
                          maxLength={200}
                        />
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetCategoryForm}
                        className="flex-1 h-12"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1 h-12">
                        {editingCategory ? "Save Changes" : "Add Category"}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* Stats - Table on mobile, cards on desktop */}
        {/* Mobile Stats Table */}
        <div className="sm:hidden mb-8">
          <div className="premium-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Metric
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/30">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-sm">Total Items</span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {menuItems.length}
                  </td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-primary" />
                    <span className="text-sm">Available</span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {menuItems.filter((i) => i.available).length}
                  </td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-primary" />
                    <span className="text-sm">Sold Out</span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {menuItems.filter((i) => !i.available).length}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-primary" />
                    <span className="text-sm">Categories</span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {categories.length}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Desktop Stats Cards */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="icon-container-secondary">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{menuItems.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="icon-container-secondary">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {menuItems.filter((i) => i.available).length}
                </p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="icon-container-secondary">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {menuItems.filter((i) => !i.available).length}
                </p>
                <p className="text-sm text-muted-foreground">Sold Out</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="icon-container-secondary">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 pr-8 sm:pr-0">
            <button
              onClick={() => setActiveTab("items")}
              className={cn(
                "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
                activeTab === "items"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Menu Items
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={cn(
                "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
                activeTab === "categories"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={cn(
                "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-2 whitespace-nowrap",
                activeTab === "settings"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              <ToggleLeft size={16} />
              Feature Toggles
            </button>
          </div>
          {/* Mobile scroll indicator */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 sm:hidden pointer-events-none">
            <div className="flex items-center gap-1 bg-gradient-to-l from-background via-background/80 to-transparent pl-6 pr-1 py-4">
              <ChevronRight className="w-4 h-4 text-muted-foreground animate-pulse" />
            </div>
          </div>
        </div>

        {activeTab === "settings" ? (
          <div className="space-y-6 max-w-2xl">
            {/* Description Toggles */}
            <div className="premium-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container-secondary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl">Description Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Control description visibility
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                  <div>
                    <p className="font-medium">Item Descriptions</p>
                    <p className="text-sm text-muted-foreground">
                      Show descriptions for menu items
                    </p>
                  </div>
                  <Switch
                    checked={itemDescriptionsEnabled}
                    onCheckedChange={(checked) =>
                      updateItemDescriptions(checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                  <div>
                    <p className="font-medium">Category Descriptions</p>
                    <p className="text-sm text-muted-foreground">
                      Show descriptions for categories
                    </p>
                  </div>
                  <Switch
                    checked={categoryDescriptionsEnabled}
                    onCheckedChange={(checked) =>
                      updateCategoryDescriptions(checked)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Video Feature */}
            <div className="premium-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container-secondary">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl">Video Section</h2>
                  <p className="text-sm text-muted-foreground">
                    Display video on home page
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                  <div>
                    <p className="font-medium">Enable Video Section</p>
                    <p className="text-sm text-muted-foreground">
                      Show video below "Who We Are"
                    </p>
                  </div>
                  <Switch
                    checked={videoEnabled}
                    onCheckedChange={(checked) => updateVideoStatus(checked)}
                  />
                </div>

                {videoEnabled && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="videoUrl">Video URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="videoUrl"
                          value={pendingVideoUrl}
                          onChange={(e) => setPendingVideoUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="h-12 flex-1"
                          disabled={videoLoading}
                        />
                        <Button
                          onClick={submitVideo}
                          disabled={videoLoading || !pendingVideoUrl.trim()}
                          className="h-12 gap-2"
                        >
                          {videoLoading ? (
                            "Saving..."
                          ) : (
                            <>
                              <Plus size={18} /> Add
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supports YouTube, YouTube Shorts, and TikTok links
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeTab === "items" ? (
          <>
            {/* Filter */}
            <div className="relative mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2 pr-8 sm:pr-0">
                <button
                  onClick={() => setFilterCategory("all")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300",
                    filterCategory === "all"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  All ({menuItems.length})
                </button>
                {categories.map((cat) => {
                  const count = menuItems.filter(
                    (i) => i.categoryId === cat.id
                  ).length;
                  const Icon = getCategoryIcon(cat.value);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCategory(cat.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300",
                        filterCategory === cat.id
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>
              {/* Mobile scroll indicator */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 sm:hidden pointer-events-none">
                <div className="flex items-center gap-1 bg-gradient-to-l from-background via-background/80 to-transparent pl-6 pr-1 py-4">
                  <ChevronRight className="w-4 h-4 text-muted-foreground animate-pulse" />
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="premium-card overflow-hidden relative">
              {filteredItems.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="icon-container mx-auto mb-4">
                    <Package className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground">No menu items found</p>
                </div>
              ) : (
                <ul ref={listRef} className="divide-y divide-border">
                  {filteredItems.map((item) => {
                    const category = categories.find(
                      (c) => c.id === item.categoryId
                    );
                    const Icon = getCategoryIcon(category?.value || "");
                    return (
                      <li
                        key={item.id}
                        className="admin-item relative p-4 sm:p-5 hover:bg-secondary/30 transition-colors group"
                      >
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                          <div className="icon-container-secondary shrink-0 mt-0.5 sm:mt-0">
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0 sm:pr-32">
                            {" "}
                            {/* Added padding-right for desktop to prevent text overlap with icons */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3
                                className={cn(
                                  "font-medium",
                                  !item.available &&
                                    "text-muted-foreground line-through"
                                )}
                              >
                                {item.name}
                              </h3>
                              {!item.available && (
                                <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded-full font-medium">
                                  Sold Out
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {category?.label || "Uncategorized"} •{" "}
                              {formatPrice(item.price)}
                            </p>
                            {itemDescriptionsEnabled && item.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Actions row */}
                        <div className="flex items-center justify-between mt-3 sm:mt-0 sm:absolute sm:right-5 sm:top-1/2 sm:-translate-y-1/2">
                          {/* Mobile Toggle Display */}
                          <div className="flex items-center gap-2 sm:hidden">
                            <span className="text-xs text-muted-foreground">
                              {item.available ? "Available" : "Unavailable"}
                            </span>
                            <Switch
                              id={`available-mobile-${item.id}`}
                              checked={item.available}
                              onCheckedChange={() =>
                                toggleAvailability(item.id)
                              }
                            />
                          </div>

                          <div className="flex items-center gap-1 sm:gap-3">
                            {/* Desktop Toggle (Hidden on mobile) */}
                            <div className="hidden sm:block">
                              <Switch
                                id={`available-desktop-${item.id}`}
                                checked={item.available}
                                onCheckedChange={() =>
                                  toggleAvailability(item.id)
                                }
                              />
                            </div>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEditItem(item);
                              }}
                              className="p-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                              aria-label="Edit item"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteItem(item.id);
                              }}
                              className="p-2.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                              aria-label="Delete item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        ) : (
          /* Categories List */
          <div className="premium-card overflow-hidden">
            {categories.length === 0 ? (
              <div className="p-12 text-center">
                <div className="icon-container mx-auto mb-4">
                  <FolderPlus className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground">No categories yet</p>
              </div>
            ) : (
              <ul ref={listRef} className="divide-y divide-border">
                {categories.map((category) => {
                  const itemCount = menuItems.filter(
                    (i) => i.categoryId === category.id
                  ).length;
                  const Icon = getCategoryIcon(category.value);
                  return (
                    <li
                      key={category.id}
                      className="admin-item p-5 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="icon-container-secondary shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {category.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </p>
                        {categoryDescriptionsEnabled &&
                          category.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {category.description}
                            </p>
                          )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                          aria-label="Edit category"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                          aria-label="Delete category"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
