import { useState, useEffect } from 'react';
import heroImage1 from '@/assets/hero-restaurant.jpg';
import heroImage2 from '@/assets/hero-restaurant-2.jpg';
import heroImage3 from '@/assets/hero-restaurant-3.jpg';

const heroImages = [heroImage1, heroImage2, heroImage3];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Restaurant ambiance ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
    </div>
  );
}
