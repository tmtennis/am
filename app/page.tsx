import HeroSplit from '@/components/HeroSplit';

export default function HomePage() {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <HeroSplit 
        left={{ href: '/work/nordic-knots', src: '/images/hero/hero-1.png', alt: 'Nordic Knots Project', label: 'NORDIC KNOTS' }}
        right={{ href: '/work/studioette', src: '/images/hero/hero-2.png', alt: 'Studioette Project', label: 'STUDIOETTE' }}
        bottom={{ href: '/work/usm-haller', src: '/images/hero/hero-3.png', alt: 'USM Haller Project', label: 'USM HALLER' }}
      />
    </div>
  );
}
