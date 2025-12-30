import { ReactNode } from 'react';
import { usePageHeaderAnimation } from '@/hooks/useGsapAnimations';

interface PageHeroSectionProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export function PageHeroSection({ icon, title, subtitle, backgroundImage }: PageHeroSectionProps) {
  const headerRef = usePageHeaderAnimation<HTMLDivElement>();

  return (
    <section className="relative py-24 md:py-32 text-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="" 
          className="w-full h-full object-cover"
        />
        {/* Lighter overlay for clearer image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/35 to-foreground/50" />
      </div>
      
      {/* Cloudy/Gradient Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg 
          viewBox="0 0 1440 120" 
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="hsl(var(--background))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--background))" />
            </linearGradient>
          </defs>
          {/* Multiple wave layers for cloudy effect */}
          <path 
            d="M0,60 C240,120 480,30 720,60 C960,90 1200,20 1440,60 L1440,120 L0,120 Z" 
            fill="hsl(var(--background))"
            opacity="0.4"
          />
          <path 
            d="M0,80 C180,40 360,100 540,80 C720,60 900,100 1080,80 C1260,60 1350,90 1440,70 L1440,120 L0,120 Z" 
            fill="hsl(var(--background))"
            opacity="0.6"
          />
          <path 
            d="M0,90 C200,110 400,85 600,95 C800,105 1000,80 1200,90 C1320,97 1380,88 1440,95 L1440,120 L0,120 Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
      
      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-pulse" />
        <div className="absolute top-32 right-1/3 w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div ref={headerRef} className="container relative z-10 text-primary-foreground">
        <div className="page-icon inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 backdrop-blur-sm mb-8 shadow-lg border border-primary-foreground/10">
          {icon}
        </div>
        <h1 className="page-title font-serif text-5xl md:text-6xl lg:text-7xl mb-6 drop-shadow-lg">
          {title}
        </h1>
        <p className="page-subtitle text-lg md:text-xl text-primary-foreground/90 max-w-md mx-auto drop-shadow">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
