'use client';

import { useState, useEffect, useRef } from 'react';

// TODO: use refs for observable components
// TODO: use a ref to store the observer and disconnect on unmount

// used only by Navlink
const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('');
  const observer = useRef<null | IntersectionObserver>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
      // relative to viewport or other
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.5, //[0, 0.25, 0.5, 0.75, 1],
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleSections = entries.filter((entry) => entry.isIntersecting);

      if (visibleSections.length > 0) {
        const mostVisibleSection = visibleSections.reduce((prev, current) => {
          if (prev.intersectionRatio > current.intersectionRatio) {
            return prev;
          } else {
            return current;
          }
        });

        setActiveSection(mostVisibleSection.target.id);
      }
    };

    observer.current = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.current && observer.current.observe(section));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return activeSection;
};

export { useActiveSection };
