import { Layout } from "@/components/layout/Layout";
import {
  useStaggerReveal,
  useCardHover,
  useFadeInLeft,
  useFadeInRight,
  useScaleReveal,
} from "@/hooks/useGsapAnimations";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Navigation,
  Youtube,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHeroSection } from "@/components/PageHeroSection";
import heroImage from "@/assets/hero-restaurant.jpg";

// TikTok icon component (not available in Lucide)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Contact() {
  const contentRef = useStaggerReveal<HTMLDivElement>(0.1);
  const formRef = useFadeInRight<HTMLDivElement>();
  const mapRef = useScaleReveal<HTMLDivElement>();
  const hoursRef = useFadeInLeft<HTMLDivElement>();
  const socialRef = useFadeInRight<HTMLDivElement>();
  const { handleMouseEnter, handleMouseLeave } = useCardHover();

  return (
    <Layout>
      {/* Hero Header with Background Image */}
      <PageHeroSection
        icon={<MessageCircle className="w-10 h-10 text-primary" />}
        title="Contact Us"
        subtitle="We'd love to hear from you"
        backgroundImage={heroImage}
      />

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24 textured-bg">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Cards */}
            <div ref={contentRef} className="space-y-6">
              {/* Phone Card */}
              <div
                className="feature-card text-center lg:text-left"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="icon-container">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Phone</h3>
                    <a
                      href="tel:+15551234567"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div
                className="feature-card text-center lg:text-left"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="icon-container">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Email</h3>
                    <a
                      href="mailto:hello@thekitchen.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      hello@thekitchen.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div
                className="feature-card text-center lg:text-left"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="icon-container">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      123 Main Street
                      <br />
                      Downtown, City 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div ref={formRef}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Hours & Social */}
      <section className="py-16 md:py-24 relative overflow-hidden textured-bg">
        <div className="container max-w-4xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Detailed Hours */}
            <div
              ref={hoursRef}
              className="premium-card p-8"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="icon-container w-12 h-12">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl">Opening Hours</h2>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b border-border/50 gap-1">
                  <span className="text-muted-foreground">Monday – Friday</span>
                  <span className="font-medium">7:00 AM – 10:00 PM</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b border-border/50 gap-1">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">8:00 AM – 11:00 PM</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b border-border/50 gap-1">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">8:00 AM – 11:00 PM</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/50 rounded-xl">
                <p className="text-sm text-accent-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Kitchen closes 30 minutes before closing
                </p>
              </div>
            </div>

            {/* Social & Connect */}
            <div
              ref={socialRef}
              className="premium-card p-8 textured-bg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="icon-container w-12 h-12">
                  <Navigation className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl">Connect With Us</h2>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Follow us on social media for daily specials, behind-the-scenes
                moments, and community updates.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="font-medium text-sm">Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="font-medium text-sm">Facebook</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="font-medium text-sm">YouTube</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                  <span className="font-medium text-sm">TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <div className="section-divider mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl">Find Us</h2>
          </div>

          <div ref={mapRef} className="premium-card p-2 overflow-hidden">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1645564756836!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
