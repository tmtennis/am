import { Inter } from "next/font/google";
import WorksScrollGrid from "@/components/WorksScrollGrid";
import { scrollProjects } from "@/data/projects";

const inter = Inter({ subsets: ["latin"] });

export default function WorksPage() {
  return (
    <div className={`${inter.className} min-h-screen bg-neutral-950 text-white antialiased`}>
      <WorksScrollGrid projects={scrollProjects} dateStamp="NEW YORK 09.04.2025" />
    </div>
  );
}
