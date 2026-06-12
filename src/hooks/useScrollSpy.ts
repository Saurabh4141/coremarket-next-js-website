import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface UseScrollSpyOptions {
  offset?: number;
  throttleMs?: number;
}

export const useScrollSpy = (
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
) => {
  const { offset = 120, throttleMs = 100 } = options;
  const [activeSection, setActiveSection] = useState<string>('');
  
  // Refs for stable state management
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActiveSectionRef = useRef<string>('');
  const lastScrollYRef = useRef<number>(0);

  // Check if reduced motion is preferred
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Deterministic active section calculation with hysteresis
  const calculateActiveSection = useCallback((): string => {
    if (sectionIds.length === 0) return '';

    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollYRef.current ? 'down' : 'up';
    lastScrollYRef.current = scrollY;

    // Hysteresis buffer - larger when scrolling up to prevent flickering
    const hysteresis = scrollDirection === 'up' ? 50 : 20;
    const threshold = scrollY + offset + hysteresis;

    let activeId = sectionIds[0];

    // Find the last section whose top has crossed the threshold
    for (let i = 0; i < sectionIds.length; i++) {
      const sectionId = sectionIds[i];
      const element = document.getElementById(sectionId);
      
      if (element) {
        const elementTop = element.offsetTop;
        
        if (elementTop <= threshold) {
          activeId = sectionId;
        } else {
          // Stop at first section that hasn't crossed threshold
          break;
        }
      }
    }

    return activeId;
  }, [sectionIds, offset]);

  // Throttled scroll handler
  useEffect(() => {
    if (sectionIds.length === 0) return;

    let lastCallTime = 0;
    let rafId: number | null = null;

    const handleScroll = () => {
      // Skip if manually scrolling via click
      if (isScrollingRef.current) return;

      const now = Date.now();
      if (now - lastCallTime < throttleMs) return;
      lastCallTime = now;

      // Cancel pending RAF
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const newActiveSection = calculateActiveSection();
        
        // Only update if actually different
        if (newActiveSection && newActiveSection !== lastActiveSectionRef.current) {
          lastActiveSectionRef.current = newActiveSection;
          setActiveSection(newActiveSection);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set initial active section
    const initialActive = calculateActiveSection();
    if (initialActive) {
      lastActiveSectionRef.current = initialActive;
      setActiveSection(initialActive);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionIds, calculateActiveSection, throttleMs]);

  // Handle hash on initial load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sectionIds.includes(hash)) {
      lastActiveSectionRef.current = hash;
      setActiveSection(hash);
      
      setTimeout(() => {
        scrollToSection(hash, offset, prefersReducedMotion);
      }, 100);
    }
  }, [sectionIds, offset, prefersReducedMotion]);

  // Manual section selection with scroll suspension
  const setActiveSectionManual = useCallback((sectionId: string) => {
    // Immediately update state
    lastActiveSectionRef.current = sectionId;
    setActiveSection(sectionId);

    // Suspend scroll observer
    isScrollingRef.current = true;

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Resume observer after scroll animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return { activeSection, setActiveSectionManual };
};

// Utility function to scroll to section
export const scrollToSection = (
  sectionId: string,
  offset: number = 120,
  prefersReducedMotion: boolean = false
) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    // Update URL hash without triggering scroll
    window.history.pushState(null, '', `#${sectionId}`);
  }
};

export default useScrollSpy;
