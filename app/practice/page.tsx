import Container from '@/components/Container';

const practices = [
  {
    number: "01",
    title: "Creative Direction",
    subtitle: "Conceptual and visual frameworks",
    description: "Our creative direction practice focuses on developing cohesive visual narratives that align with strategic objectives. We begin each project by understanding the cultural context and competitive landscape, then develop concepts that differentiate while remaining authentic to the brand's core values.",
    details: [
      "The process involves collaborative workshops, iterative development, and rigorous testing to ensure that creative solutions resonate with target audiences. We believe that effective creative direction requires both intuitive understanding and analytical rigor.",
      "Through careful consideration of tone, voice, and visual language, we help organizations articulate their unique perspective in ways that create meaningful connections with their communities."
    ]
  },
  {
    number: "02", 
    title: "Spatial Design",
    subtitle: "Built form and environmental experience",
    description: "Spatial design represents the physical manifestation of brand experience, where two-dimensional concepts take three-dimensional form. Our approach considers human movement, sensory experience, and environmental psychology to create spaces that communicate effectively.",
    details: [
      "Whether designing exhibition environments, retail experiences, or office interiors, we prioritize clarity of navigation and richness of experience. Each element is considered for its contribution to the overall narrative and its impact on user behavior.",
      "Our spatial work often incorporates custom typography, wayfinding systems, and environmental graphics that reinforce brand identity while enhancing functionality. The result is architecture that serves both aesthetic and communicative purposes."
    ]
  },
  {
    number: "03",
    title: "Curation", 
    subtitle: "Selection and presentation with intent",
    description: "Curation extends beyond the traditional gallery context to encompass any practice that involves selecting, organizing, and presenting content with intentionality. Our curatorial work includes exhibition development, content strategy, and cultural programming.",
    details: [
      "We approach curation as a form of storytelling, where the selection and sequencing of elements creates meaning beyond the sum of individual parts. This requires deep understanding of subject matter, audience expectations, and contextual considerations.",
      "Our curatorial projects often explore the intersection of design, culture, and society, highlighting work that advances discourse and challenges conventional thinking. Through thoughtful presentation, we aim to create platforms for meaningful dialogue and discovery."
    ]
  }
];

export default function PracticePage() {
  return (
    <Container>
      <div className="py-16 md:py-24">
        <div className="mb-20 md:mb-28">
          <h1 className="text-xl font-extrabold mb-6">PRACTICE</h1>
          <div className="max-w-3xl">
            <p className="text-lg text-neutral-300 leading-relaxed">
              Alexander May Studio operates through three core practices that intersect and inform one another. Each discipline maintains its own methodology while contributing to a unified approach to design and culture.
            </p>
          </div>
        </div>

        {/* Practice sections */}
        <div className="space-y-24 md:space-y-32">
          {practices.map((practice, index) => (
            <section key={practice.number} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left column - number and title */}
                <div className="lg:col-span-4">
                  <div className="sticky top-24">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-xs font-mono text-neutral-500 tracking-wider">
                        {practice.number}
                      </span>
                      <div className="flex-1 h-px bg-neutral-800"></div>
                    </div>
                    <h2 className="text-2xl font-extrabold mb-2 group-hover:text-neutral-200 transition-colors duration-300">
                      {practice.title}
                    </h2>
                    <p className="text-sm text-neutral-400 italic">
                      {practice.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right column - content */}
                <div className="lg:col-span-8 space-y-6">
                  <p className="text-base leading-relaxed text-neutral-200">
                    {practice.description}
                  </p>
                  
                  <div className="space-y-4 pt-4">
                    {practice.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-sm leading-relaxed text-neutral-400">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-32 pt-16 border-t border-neutral-800">
          <div className="max-w-2xl">
            <p className="text-sm leading-relaxed text-neutral-300">
              These practices are not isolated services but interconnected approaches to solving complex cultural and commercial challenges. 
              Through their integration, we develop work that operates simultaneously as functional solution and cultural statement.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
