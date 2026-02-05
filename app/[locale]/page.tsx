import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { getProjects, getTestimonials, getPosts, getSiteSettings } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  let blogPosts: Awaited<ReturnType<typeof getPosts>> = [];
  let cvUrl: string | null = null;

  try {
    const [projectsData, testimonialsData, postsData, settings] = await Promise.all([
      getProjects(),
      getTestimonials(true),
      getPosts(),
      getSiteSettings().catch(() => null),
    ]);
    projects = projectsData;
    testimonials = testimonialsData;
    blogPosts = postsData;
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
      <Testimonials initialTestimonials={testimonials} />
      <Blog initialPosts={blogPosts} />
      <Contact />
    </div>
  );
}

