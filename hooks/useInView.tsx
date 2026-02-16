'use client';

import { useState, useEffect, useRef } from 'react';

type UseInViewOptions<T> = {
  container?: React.RefObject<HTMLElement | null>;
  refs: React.RefObject<T | null>[];
  options?: IntersectionObserverInit;
};

function useInView<T extends HTMLElement>({ container, refs, options }: UseInViewOptions<T>) {
  const [inViewport, setInViewport] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -70% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
    ...options,
  };

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleSections = entries.filter((entry) => entry.isIntersecting);

      if (visibleSections.length === 0) {
        setInViewport(null);
        return;
      }

      const mostVisibleSection = visibleSections.reduce((prev, current) => {
        if (prev.intersectionRatio > current.intersectionRatio) {
          return prev;
        } else {
          return current;
        }
      }, visibleSections[0]);

      setInViewport(mostVisibleSection.target.id);
    };

    if (!observer.current) {
      observer.current = new IntersectionObserver(observerCallback, observerOptions);
    }

    refs.forEach((ref) => {
      if (ref.current && observer.current) {
        observer.current.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current && observer.current) {
          observer.current.unobserve(ref.current);
        }
      });
    };
  }, [options, refs]);

  return inViewport;
}
export default useInView;
