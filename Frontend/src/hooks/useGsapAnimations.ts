import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement>(staggerDelay = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.children;
    
    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerDelay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [staggerDelay]);

  return ref;
}

export function useHeroAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      element.querySelectorAll('.hero-title'),
      { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }
    )
      .fromTo(
        element.querySelectorAll('.hero-subtitle'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        element.querySelectorAll('.hero-cta'),
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        element.querySelectorAll('.hero-decoration'),
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
        '-=0.8'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: () => window.innerHeight * speed * 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return ref;
}

export function useCardHover() {
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      scale: 1.02,
      y: -8,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return { handleMouseEnter, handleMouseLeave };
}

// New: Fade in from left animation
export function useFadeInLeft<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -80,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

// New: Fade in from right animation
export function useFadeInRight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 80,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

// New: Scale reveal animation
export function useScaleReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

// New: Rotate in animation
export function useRotateIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        rotation: -15,
        y: 40,
      },
      {
        opacity: 1,
        rotation: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

// New: Page header animation for inner pages
export function usePageHeaderAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      element.querySelectorAll('.page-icon'),
      { opacity: 0, scale: 0, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
    )
      .fromTo(
        element.querySelectorAll('.page-title'),
        { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1 },
        '-=0.4'
      )
      .fromTo(
        element.querySelectorAll('.page-subtitle'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}

// New: Text reveal animation (word by word)
export function useTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

// New: Counter animation
export function useCounterAnimation<T extends HTMLElement>(target: number, duration = 2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const counter = { value: 0 };
    
    gsap.to(counter, {
      value: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        element.textContent = Math.round(counter.value).toString();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [target, duration]);

  return ref;
}

// New: Floating animation
export function useFloatingAnimation<T extends HTMLElement>(amplitude = 10) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: amplitude,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [amplitude]);

  return ref;
}
