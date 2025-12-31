import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { useMenu } from "@/context/MenuContext";
import { useSettings } from "@/context/SettingsContext";
import { formatPrice } from "@/lib/menuData";
import { cn } from "@/lib/utils";
import { useFadeInLeft, useScaleReveal } from "@/hooks/useGsapAnimations";
import {
  Utensils,
  Coffee,
  Sun,
  Moon,
  Wine,
  Cake,
  Tag,
  ChevronRight,
} from "lucide-react";
import { PageHeroSection } from "@/components/PageHeroSection";
import heroImage from "@/assets/hero-restaurant-2.jpg";
import gsap from "gsap";

const defaultCategoryIcons: Record<string, React.ElementType> = {
  breakfast: Sun,
  lunch: Utensils,
  dinner: Moon,
  drinks: Coffee,
  desserts: Cake,
  wine: Wine,
};

function getCategoryIcon(value: string): React.ElementType {
  return defaultCategoryIcons[value] || Tag;
}

export default function Menu() {
  const { menuItems, categories } = useMenu();
  const { categoryDescriptionsEnabled } = useSettings();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const menuListRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const sectionTitleRef = useFadeInLeft<HTMLDivElement>();
  const menuCardRef = useScaleReveal<HTMLDivElement>();

  const filteredItems =
    activeCategory === "all"
      ? menuItems.filter((item) => item.available)
      : menuItems.filter(
          (item) => item.categoryId === activeCategory && item.available
        );

  const groupedItems = categories.reduce((acc, cat) => {
    acc[cat.id] = filteredItems.filter((item) => item.categoryId === cat.id);
    return acc;
  }, {} as Record<string, typeof filteredItems>);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!menuListRef.current) return;

    // INCREASED OFFSET: 180px gives more space from the sticky filter
    const marginOffset = 180;
    const elementPosition = menuListRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - marginOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    const items = menuListRef.current.querySelectorAll(".menu-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        delay: 0.2,
      }
    );
  }, [activeCategory]);

  return (
    <Layout>
      <PageHeroSection
        icon={<Utensils className="w-10 h-10 text-primary" />}
        title="Our Menu"
        subtitle="Fresh, seasonal dishes prepared with care and passion"
        backgroundImage={heroImage}
      />

      {/* Sticky Category Filter */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="container">
          <div className="relative">
            <nav className="flex gap-2 overflow-x-auto py-4 pr-10 md:pr-0 scrollbar-hide">
              <button
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300",
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                All
              </button>
              {categories.map((cat) => {
                const Icon = getCategoryIcon(cat.value);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300",
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </nav>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden pointer-events-none">
              <div className="flex items-center gap-1 bg-gradient-to-l from-background via-background to-transparent pl-6 pr-1 py-4">
                <ChevronRight className="w-4 h-4 text-muted-foreground animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu List Container */}
      <section className="py-16 md:py-24 textured-bg min-h-screen">
        <div ref={menuListRef} className="container max-w-6xl">
          {activeCategory === "all" ? (
            <div className="space-y-20">
              {categories.map((cat) => {
                const items = groupedItems[cat.id];
                if (!items || items.length === 0) return null;
                const Icon = getCategoryIcon(cat.value);

                return (
                  <div key={cat.id}>
                    <div className="mb-10 text-center">
                      <div className="inline-flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-primary/50" />
                        <div className="icon-container w-14 h-14 flex items-center justify-center rounded-full bg-primary shadow-lg">
                          <Icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-primary/50" />
                      </div>
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                        {cat.label}
                      </h2>
                      {categoryDescriptionsEnabled && cat.description && (
                        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {items.map((item) => (
                        <MenuItem key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {/* Single Category View */}
              <div ref={sectionTitleRef} className="mb-10 text-center">
                <div className="inline-flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-primary/50" />
                  <div className="icon-container w-14 h-14 flex items-center justify-center rounded-full bg-primary shadow-lg">
                    {(() => {
                      const category = categories.find(
                        (c) => c.id === activeCategory
                      );
                      const Icon = getCategoryIcon(category?.value || "");
                      return (
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      );
                    })()}
                  </div>
                  <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-primary/50" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                  {categories.find((c) => c.id === activeCategory)?.label}
                </h2>
                {categoryDescriptionsEnabled &&
                  categories.find((c) => c.id === activeCategory)
                    ?.description && (
                    <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                      {
                        categories.find((c) => c.id === activeCategory)
                          ?.description
                      }
                    </p>
                  )}
              </div>

              {filteredItems.length > 0 ? (
                <div
                  ref={menuCardRef}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                >
                  {filteredItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="premium-card p-12 text-center rounded-2xl">
                  <p className="text-muted-foreground">
                    No items available in this category
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function MenuItem({ item }: { item: any }) {
  return (
    <div className="menu-item group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
