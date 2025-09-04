import HeroSplit from '@/components/HeroSplit';

export default function HomePage() {
  const heroItems = {
    left: {
      href: '/work/nordic-knot',
      src: '/images/hero/hero-1.png',
      alt: 'Nordic Knot Project',
      label: 'NORDIC KNOT'
    },
    right: {
      href: '/work/meridian-gallery',
      src: '/images/hero/hero-2.png',
      alt: 'Meridian Gallery Project',
      label: 'PIERRE AUGUSTINUS ROSE'
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <HeroSplit 
        left={heroItems.left}
        right={heroItems.right}
      />
    </div>
  );
}
