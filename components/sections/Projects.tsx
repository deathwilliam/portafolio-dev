"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useTranslations } from 'next-intl';

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    category: string;
    tech: string[];
    link?: string | null;
    githubLink?: string | null;
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
        <section id="projects" className="py-12 bg-muted/30">
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
                                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Image area */}
                                <div className="relative h-56 overflow-hidden shrink-0 bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950">
                                    {project.imageUrl && (
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        />
                                    )}
                                    {/* Bottom gradient fade */}
                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

                                    {/* Category badge top-left */}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-xs font-semibold text-white bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full shadow">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Action buttons top-right, appear on hover */}
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                                        {project.link && (
                                            <button
                                                onClick={() => window.open(project.link ?? undefined, "_blank")}
                                                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        )}
                                        {project.githubLink && (
                                            <button
                                                onClick={() => window.open(project.githubLink ?? undefined, "_blank")}
                                                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Title overlay at bottom of image */}
                                    <div className="absolute inset-x-0 bottom-0 p-4">
                                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-1 drop-shadow">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <p className="text-foreground/70 text-sm mb-4 line-clamp-3 flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {project.tech && project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md"
                                            >
                                                {tech}
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
