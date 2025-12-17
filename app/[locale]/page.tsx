import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { getProjects, getTestimonials, getPosts } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let projects = [];
  let testimonials = [];
  let blogPosts = [];

  try {
    [projects, testimonials, blogPosts] = await Promise.all([
      getProjects(),
      getTestimonials(true),
      getPosts(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data for Home page:", error);
    // Silent fail to allow page to render
  }

  console.log("HomePage Testimonials:", JSON.stringify(testimonials, null, 2));

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

