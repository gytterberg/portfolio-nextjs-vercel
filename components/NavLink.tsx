'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useActiveSection } from '@/hooks/useActiveSection';

type NavLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function NavLink({ href, className, children, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  // Update hash state when the window location hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Coerce href to string (LinkProps can accept objects)
  const hrefString = typeof href === 'string' ? href : String(href);
  const [basePathRaw, anchor] = hrefString.split('#');

  const normalize = (p?: string) => {
    if (!p) return '/';
    return p.replace(/\/+$/, '') || '/';
  };

  const basePath = normalize(basePathRaw);
  const currentPath = normalize(pathname || '/');

  // Determine if the path matches (basePath will be '/' for pure hash links like #section1)
  const isSamePath = basePath === '/' || currentPath === basePath;
  // Determine if the hash matches (anchor will be undefined if no hash in href)
  const isSameAnchor = anchor ? hash === `#${anchor}` : hash === '';

  //   const isSectionVisible = useActiveSection() === anchor;

  const isActive = isSamePath && isSameAnchor; // || isSectionVisible;

  return (
    <Link
      href={href}
      className={classNames(className, {
        'text-red-600': isActive,
      })}
      aria-current={isActive ? 'page' : undefined}
      // Optional: Manually update the hash if Next.js <Link> doesn't trigger hashchange event immediately
      onClick={() => {
        if (anchor) {
          window.location.hash = anchor;
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default NavLink;
