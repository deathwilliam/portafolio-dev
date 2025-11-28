import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { getProjects, getTestimonials, getBlogPosts } from "@/lib/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [projects, testimonials, blogPosts] = await Promise.all([
    getProjects(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <div className="flex flex-col gap-0">
      <section id="hero">
        <Hero />
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

