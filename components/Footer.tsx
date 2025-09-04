import Link from 'next/link';
import Container from './Container';

const navigation = [
  { name: 'Studio', href: '/studio' },
  { name: 'Work', href: '/work' },
  { name: 'Works', href: '/works' },
  { name: 'Practice', href: '/practice' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-700 py-1 mt-16">
      <Container>
        <div className="space-y-0">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block font-extrabold text-white text-lg transition-colors duration-150 hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="mt-2">
          <p className="text-sm text-neutral-400">
            © ALEXANDER MAY STUDIO MMXXV. ALL RIGHTS RESERVED.
          </p>
        </div>
      </Container>
    </footer>
  );
}
