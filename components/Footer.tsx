import Link from 'next/link';

const navigation = [
  { name: 'Studio', href: '/studio' },
  { name: 'Work', href: '/work' },
  { name: 'Practice', href: '/practice' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="py-1 mt-16">
      <div className="pl-4">
        <div className="space-y-0">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="block font-extrabold text-white text-lg transition-colors duration-150 hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white leading-tight">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="mt-16">
          <p className="text-xs text-neutral-400">© ALEXANDER MAY STUDIO MMXXV. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
