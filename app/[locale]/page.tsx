import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { getProjects, getSiteSettings } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
    let projects: any[] = [];
    let cvUrl: string | null = null;

    try {
        const [projectsData, settings] = await Promise.all([
            getProjects(),
            getSiteSettings().catch(() => null),
        ]);
        projects = projectsData;
        cvUrl = settings?.cvUrl || null;
    } catch (error) {
    console.error("Failed to fetch data for Home page:", error);
  }

  return (
    <div className="flex flex-col gap-0">
      <section id="hero">
        <Hero cvUrl={cvUrl} />
      </section>
      <About />
      <Skills />
      <Projects initialProjects={projects} />
      <Contact />
    </div>
  );
}

