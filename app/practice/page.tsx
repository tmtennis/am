import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

export default function PracticePage() {
  return (
    <Container>
      <div className="py-16 md:py-24 space-y-16">
        <section>
          <SectionHeading className="mb-8">Creative Direction</SectionHeading>
          <div className="prose prose-neutral">
            <p>
              Our creative direction practice focuses on developing cohesive visual narratives 
              that align with strategic objectives. We begin each project by understanding 
              the cultural context and competitive landscape, then develop concepts that 
              differentiate while remaining authentic to the brand's core values.
            </p>
            <p>
              The process involves collaborative workshops, iterative development, and 
              rigorous testing to ensure that creative solutions resonate with target 
              audiences. We believe that effective creative direction requires both 
              intuitive understanding and analytical rigor.
            </p>
            <p>
              Through careful consideration of tone, voice, and visual language, we help 
              organizations articulate their unique perspective in ways that create 
              meaningful connections with their communities.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading className="mb-8">Spatial Design</SectionHeading>
          <div className="prose prose-neutral">
            <p>
              Spatial design represents the physical manifestation of brand experience, 
              where two-dimensional concepts take three-dimensional form. Our approach 
              considers human movement, sensory experience, and environmental psychology 
              to create spaces that communicate effectively.
            </p>
            <p>
              Whether designing exhibition environments, retail experiences, or office 
              interiors, we prioritize clarity of navigation and richness of experience. 
              Each element is considered for its contribution to the overall narrative 
              and its impact on user behavior.
            </p>
            <p>
              Our spatial work often incorporates custom typography, wayfinding systems, 
              and environmental graphics that reinforce brand identity while enhancing 
              functionality. The result is architecture that serves both aesthetic and 
              communicative purposes.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading className="mb-8">Curation</SectionHeading>
          <div className="prose prose-neutral">
            <p>
              Curation extends beyond the traditional gallery context to encompass any 
              practice that involves selecting, organizing, and presenting content with 
              intentionality. Our curatorial work includes exhibition development, 
              content strategy, and cultural programming.
            </p>
            <p>
              We approach curation as a form of storytelling, where the selection and 
              sequencing of elements creates meaning beyond the sum of individual parts. 
              This requires deep understanding of subject matter, audience expectations, 
              and contextual considerations.
            </p>
            <p>
              Our curatorial projects often explore the intersection of design, culture, 
              and society, highlighting work that advances discourse and challenges 
              conventional thinking. Through thoughtful presentation, we aim to create 
              platforms for meaningful dialogue and discovery.
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}
