'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Studio', href: '/studio' },
  { name: 'Work', href: '/work' },
  { name: 'Practice', href: '/practice' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-neutral-700 h-16 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} 
      style={{ backgroundColor: '#1a1919' }}
    >
      <div className="relative h-16">
        <Link href="/" className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-white text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white z-10">
          ALEXANDER MAY
        </Link>
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-8">
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${pathname === item.href ? 'text-white' : 'text-neutral-400'}`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block font-extrabold text-white text-sm">SIZED</div>

          <button
            type="button"
            className="md:hidden text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-transform duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`transform transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`}>
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute left-0 right-0 top-16 backdrop-blur-sm transition-all duration-300 ease-in-out ${mobileMenuOpen && isVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}
        style={{ backgroundColor: 'rgba(26, 25, 25, 0.95)' }}
      >
        <nav id="mobile-menu" className="border-t border-neutral-700">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-lg font-medium transition-all duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transform hover:translate-x-1 ${pathname === item.href ? 'text-white' : 'text-neutral-400'}`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' }}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-neutral-700">
              <div className="font-extrabold text-white text-sm tracking-wider">SIZED</div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
