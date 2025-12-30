import { Link } from 'react-router-dom';
import { ChefHat, Instagram, Facebook, MapPin, Phone, Youtube } from 'lucide-react';

// TikTok icon component
const TikTokIcon = ({ className, size }: { className?: string; size?: number }) => (
  <svg className={className} width={size || 18} height={size || 18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="container relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary" />
              </div>
              <span className="font-serif text-2xl font-semibold">The Kitchen</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A neighborhood favorite serving thoughtfully prepared dishes in a warm, 
              welcoming atmosphere since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-5 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Menu' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-medium mb-5 text-sm uppercase tracking-wider">Hours</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between max-w-[180px]">
                <span>Mon – Fri</span>
                <span className="font-medium text-foreground">7am – 10pm</span>
              </li>
              <li className="flex justify-between max-w-[180px]">
                <span>Sat – Sun</span>
                <span className="font-medium text-foreground">8am – 11pm</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>123 Main Street<br />Downtown, City 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                  (555) 123-4567
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all duration-300"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Kitchen. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with love for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
