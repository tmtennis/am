import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

export default function ContactPage() {
  return (
    <Container>
      <div className="py-16 md:py-24">
        <SectionHeading className="mb-12">Contact</SectionHeading>
        
        <div className="max-w-2xl space-y-12">
          <section>
            <h3 className="font-medium mb-4">General</h3>
            <div className="space-y-2">
              <p>
                <a href="mailto:hello@alexandermay.studio" className="transition-colors duration-150 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                  hello@alexandermay.studio
                </a>
              </p>
              <p className="text-sm text-neutral-600">For new project inquiries and collaboration opportunities.</p>
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-4">Press</h3>
            <div className="space-y-2">
              <p>
                <a href="mailto:press@alexandermay.studio" className="transition-colors duration-150 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                  press@alexandermay.studio
                </a>
              </p>
              <p className="text-sm text-neutral-600">For media inquiries, interviews, and publication requests.</p>
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-4">Jobs</h3>
            <div className="space-y-2">
              <p>
                <a href="mailto:jobs@alexandermay.studio"
                  className="transition-colors duration-150 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  jobs@alexandermay.studio
                </a>
              </p>
              <p className="text-sm text-neutral-600">
                For employment opportunities and internship applications.
              </p>
            </div>
          </section>

          <section className="pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              Follow us on{' '}
              <a 
                href="https://instagram.com/alexandermaystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                Instagram
              </a>
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
