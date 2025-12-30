import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useMenu } from "@/context/MenuContext";
import { formatPrice } from "@/lib/menuData";
import {
  MapPin,
  Clock,
  Phone,
  Leaf,
  Heart,
  Sparkles,
  ChefHat,
  Coffee,
  Wine,
  Utensils,
  Star,
} from "lucide-react";
import {
  useHeroAnimation,
  useScrollReveal,
  useStaggerReveal,
  useCardHover,
  useFadeInLeft,
  useScaleReveal,
  useTextReveal,
} from "@/hooks/useGsapAnimations";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ParticleEffect } from "@/components/ParticleEffect";
import { VideoSection } from "@/components/VideoSection";

export default function Home() {
  const { menuItems, categories } = useMenu();
  const heroRef = useHeroAnimation<HTMLDivElement>();
  const whoWeAreRef = useTextReveal<HTMLDivElement>();
  const whyChooseTitleRef = useScaleReveal<HTMLDivElement>();
  const whyChooseRef = useStaggerReveal<HTMLDivElement>(0.2);
  const menuPreviewTitleRef = useFadeInLeft<HTMLDivElement>();
  const hoursTitleRef = useScrollReveal<HTMLDivElement>();
  const hoursRef = useStaggerReveal<HTMLDivElement>(0.15);
  const { handleMouseEnter, handleMouseLeave } = useCardHover();

  // Get first 2 items from each category
  const previewItems = categories.flatMap((category) => {
    return menuItems
      .filter((item) => item.available && item.categoryId === category.id)
      .slice(0, 2)
      .map((item) => ({ ...item, categoryLabel: category.label }));
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <HeroCarousel />

        {/* Particle Effect */}
        <ParticleEffect />

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className="text-center max-w-3xl mx-auto relative z-10 px-4"
        >
          {/* Decorative icon */}
          <div className="hero-decoration inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm mb-8">
            <ChefHat className="w-10 h-10 text-primary" />
          </div>

          <h1 className="hero-title font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-6 text-balance text-foreground">
            The Kitchen
          </h1>

          <p className="hero-subtitle hero-subtitle-elegant text-xl md:text-2xl mb-10 max-w-md mx-auto text-foreground">
            Where every dish tells a story
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/menu" className="flex items-center gap-2">
                <Utensils className="w-5 h-5 transition-transform group-hover:rotate-12" />
                View Menu
              </Link>
            </Button>
            <Button asChild variant="elegant" size="lg">
              <Link to="/contact">Make a Reservation</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="hero-decoration mt-16 flex items-center justify-center gap-8 text-foreground/80">
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-sm font-medium">4.9 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">2000+ Happy Guests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 md:py-32">
        <div ref={whoWeAreRef} className="container max-w-4xl text-center">
          <div className="section-divider mb-8" />
          <h2 className="font-serif text-4xl md:text-5xl mb-8">Who We Are</h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We are a neighborhood restaurant committed to crafting memorable
            meals from locally sourced ingredients. Our kitchen celebrates
            simplicity, letting quality produce shine in every dish we serve.
          </p>

          {/* Decorative icons row */}
          <div className="mt-12 flex justify-center gap-6">
            <div className="icon-container-secondary">
              <Coffee className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="icon-container-secondary">
              <Wine className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="icon-container-secondary">
              <Utensils className="w-5 h-5 text-accent-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Conditional */}
      <VideoSection />

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/50" />
        <div className="container relative z-10">
          <div ref={whyChooseTitleRef} className="text-center mb-16">
            <div className="section-divider mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground">
              Experience dining the way it should be
            </p>
          </div>

          <div
            ref={whyChooseRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Leaf,
                title: "Fresh Ingredients",
                description:
                  "We source locally every day, ensuring the freshest seasonal produce graces your plate with natural flavors.",
              },
              {
                icon: Heart,
                title: "Welcoming Space",
                description:
                  "A warm, comfortable atmosphere perfect for intimate dinners, family gatherings, or celebrating special moments.",
              },
              {
                icon: Sparkles,
                title: "Thoughtful Service",
                description:
                  "Our team takes pride in creating a seamless, memorable dining experience from the moment you arrive.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="feature-card text-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="icon-container mx-auto mb-6">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-24 md:py-32 textured-bg">
        <div className="container">
          <div ref={menuPreviewTitleRef} className="text-center mb-16">
            <div className="section-divider mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              From Our Menu
            </h2>
            <p className="text-muted-foreground">A taste of what awaits you</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="premium-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/30">
                    <th className="text-left py-4 px-6 font-serif text-lg font-medium text-foreground">
                      Dish
                    </th>
                    <th className="text-left py-4 px-6 font-serif text-lg font-medium text-foreground hidden sm:table-cell">
                      Category
                    </th>
                    <th className="text-right py-4 px-6 font-serif text-lg font-medium text-foreground">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-border/30 last:border-0 group hover:bg-secondary/20 transition-colors duration-300 animate-fade-in"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <td className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                            {item.name}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1 sm:hidden">
                            {item.categoryLabel}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6 hidden sm:table-cell">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                          {item.categoryLabel}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <span className="font-semibold text-primary whitespace-nowrap">
                          {formatPrice(item.price)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="elegant" size="lg" className="group">
                <Link to="/menu" className="flex items-center gap-2">
                  View Full Menu
                  <Utensils className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/50" />
        <div className="container relative z-10">
          <div ref={hoursTitleRef} className="text-center mb-16">
            <div className="section-divider mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl">Visit Us</h2>
          </div>

          <div
            ref={hoursRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* Hours Card */}
            <div
              className="premium-card p-8"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container w-12 h-12">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl">Opening Hours</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex justify-between pb-3 border-b border-border/50">
                  <span>Monday – Friday</span>
                  <span className="font-medium text-foreground">
                    7am – 10pm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday – Sunday</span>
                  <span className="font-medium text-foreground">
                    8am – 11pm
                  </span>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div
              className="premium-card p-8"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container w-12 h-12">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl">Find Us</h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>123 Main Street</p>
                <p>Downtown, City 12345</p>
                <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                  <Phone className="w-4 h-4 text-primary" />
                  <a
                    href="tel:+15551234567"
                    className="hover:text-foreground transition-colors"
                  >
                    (555) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
