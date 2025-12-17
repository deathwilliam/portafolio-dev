"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useTranslations } from 'next-intl';

interface Project {
    id: string;
    title: string;
    description: string;
    image_url?: string;
    category: string;
    tech: string[];
    link?: string;
    github_link?: string;
}

interface ProjectsProps {
    initialProjects: Project[];
}

export default function Projects({ initialProjects = [] }: ProjectsProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const t = useTranslations('Projects');

    // Derive categories from projects
    const projectCategories = useMemo(() => {
        const categories = new Set(initialProjects.map(p => p.category));
        return ["All", ...Array.from(categories)];
    }, [initialProjects]);

    const filteredProjects = useMemo(() => {
        return activeCategory === "All"
            ? initialProjects
            : initialProjects.filter(project => project.category === activeCategory);
    }, [activeCategory, initialProjects]);

    if (!initialProjects.length) {
        return null; // Or a loading state/empty state
    }

    return (
        <section id="projects" className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {projectCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                ? "bg-primary text-white shadow-md scale-105"
                                : "bg-background text-foreground/70 hover:bg-muted border border-muted"
                                }`}
                        >
                            {category === "All" ? t('all') : category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group bg-background rounded-2xl overflow-hidden border border-muted hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-64 overflow-hidden shrink-0">
                                    {project.image_url && (
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        {project.link && (
                                            <Button size="sm" variant="secondary" onClick={() => window.open(project.link, "_blank")}>
                                                <ExternalLink className="w-4 h-4 mr-2" /> {t('viewDemo')}
                                            </Button>
                                        )}
                                        {project.github_link && (
                                            <Button size="sm" variant="outline" className="bg-background/10 text-white border-white hover:bg-white/20" onClick={() => window.open(project.github_link, "_blank")}>
                                                <Github className="w-4 h-4 mr-2" /> {t('viewCode')}
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-4">
                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-2">
                                            {project.category}
                                        </span>
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-foreground/70 mb-6 line-clamp-3 flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tech && project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs font-medium text-foreground/60 bg-muted px-2 py-1 rounded-md flex items-center"
                                            >
                                                <Code2 className="w-3 h-3 mr-1" /> {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
