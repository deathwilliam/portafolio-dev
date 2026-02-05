"use client";

import { motion } from "framer-motion";
import {
    Database, Layout, Smartphone,
    Terminal
} from "lucide-react";
import { useTranslations } from 'next-intl';

const skills = [
    {
        category: "Frontend",
        icon: <Layout className="w-8 h-8 text-blue-500" />,
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Framer Motion"]
    },
    {
        category: "Backend",
        icon: <Database className="w-8 h-8 text-green-500" />,
        items: ["Node.js", "Express", "PostgreSQL", "Supabase", "Laravel", "GraphQL"]
    },
    {
        category: "Tools & DevOps",
        icon: <Terminal className="w-8 h-8 text-orange-500" />,
        items: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Jest"]
    },
    {
        category: "Mobile & Others",
        icon: <Smartphone className="w-8 h-8 text-purple-500" />,
        items: ["React Native", "Expo", "Figma", "UI/UX Design", "SEO", "Performance"]
    }
];

export default function Skills() {
    const t = useTranslations('Skills');

    return (
        <section id="skills" className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-md transition-all group"
                        >
                            <div className="bg-muted/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {skill.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                            <ul className="space-y-2">
                                {skill.items.map((item) => (
                                    <li key={item} className="flex items-center text-foreground/70">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
