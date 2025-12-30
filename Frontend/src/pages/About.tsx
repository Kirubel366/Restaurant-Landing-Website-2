import { Layout } from '@/components/layout/Layout';
import { useStaggerReveal, useCardHover, useFadeInLeft, useFadeInRight, useScaleReveal } from '@/hooks/useGsapAnimations';
import { Heart, Users, Award, BookOpen, Sparkles, Leaf } from 'lucide-react';
import { PageHeroSection } from '@/components/PageHeroSection';
import aboutCookingImage from '@/assets/about-cooking.jpg';
import aboutInteriorImage from '@/assets/about-interior.jpg';
import heroImage from '@/assets/hero-restaurant-3.jpg';

export default function About() {
  const storyCardRef = useFadeInLeft<HTMLDivElement>();
  const storyImageRef = useFadeInRight<HTMLDivElement>();
  const spaceImageRef = useFadeInLeft<HTMLDivElement>();
  const spaceCardRef = useFadeInRight<HTMLDivElement>();
  const valuesRef = useStaggerReveal<HTMLDivElement>(0.15);
  const valuesTitleRef = useScaleReveal<HTMLDivElement>();
  const { handleMouseEnter, handleMouseLeave } = useCardHover();

  return (
    <Layout>
      {/* Hero Header with Background Image */}
      <PageHeroSection 
        icon={<BookOpen className="w-10 h-10 text-primary" />}
        title="About Us"
        subtitle="Our story, our passion, our promise"
        backgroundImage={heroImage}
      />

      {/* Story with Images */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          {/* Our Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div ref={storyCardRef} className="premium-card p-8 md:p-10">
              <h2 className="font-serif text-3xl md:text-4xl mb-8 flex items-center gap-4">
                <span className="icon-container w-12 h-12 shrink-0">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </span>
                Our Story
              </h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  The Kitchen began with a simple idea: to create a space where good food 
                  brings people together. Founded in 2015, we've grown from a small neighborhood 
                  café into a beloved gathering place for friends, families, and food lovers alike.
                </p>
                <p>
                  Our philosophy centers on simplicity and quality. We believe that the best 
                  dishes start with the finest ingredients, prepared with care and served with 
                  warmth.
                </p>
              </div>
            </div>
            
            <div ref={storyImageRef} className="relative">
              <img 
                src={aboutCookingImage} 
                alt="Chef preparing fresh ingredients in the kitchen"
                className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-elegant"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>

          {/* Our Space */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-0 py-6 md:p-10 rounded-3xl textured-bg bg-transparent">
            <div ref={spaceImageRef} className="relative order-2 lg:order-1">
              <img 
                src={aboutInteriorImage} 
                alt="Cozy restaurant interior with warm ambiance"
                className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-elegant"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            <div ref={spaceCardRef} className="premium-card p-8 md:p-10 order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-4xl mb-8 flex items-center gap-4">
                <span className="icon-container w-12 h-12 shrink-0">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </span>
                Our Space
              </h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  We designed our restaurant to feel like an extension of home—comfortable, 
                  welcoming, and unpretentious. Natural light fills our dining room through 
                  large windows, and the warm wood accents create an atmosphere that invites 
                  you to slow down and savor the moment.
                </p>
                <p>
                  Whether you're stopping by for your morning coffee, meeting friends for 
                  lunch, or celebrating a special evening, we hope you'll feel at home here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/50" />
        <div className="container relative z-10 max-w-5xl">
          <div ref={valuesTitleRef} className="text-center mb-16">
            <div className="section-divider mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              What Guides Us
            </h2>
            <p className="text-muted-foreground">The principles that shape everything we do</p>
          </div>
          
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Quality',
                description: 'We never compromise on ingredients. Every dish reflects our unwavering commitment to excellence and authentic flavors.',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'We support local farmers and producers, strengthening the bonds that make our neighborhood special.',
              },
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'From sourcing to serving, we make conscious choices to minimize our footprint and protect our environment.',
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
    </Layout>
  );
}