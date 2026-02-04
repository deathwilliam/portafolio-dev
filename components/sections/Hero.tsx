"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { getSiteSettings } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Hero() {
    const t = useTranslations('Hero');
    const [cvUrl, setCvUrl] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getSiteSettings().then((settings: any) => {
            if (settings?.cv_url) setCvUrl(settings.cv_url);
        });
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Modern Gradient Background */}
            <div className="absolute inset-0 -z-10">
                {/* Main gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

                {/* Animated gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left side - Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-block mb-4"
                        >
                            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-sm font-medium text-blue-600 dark:text-blue-400">
                                👋 {t('greeting')}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                        >
                            <span className="block text-foreground mb-2">Wilfredo Melgar</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                                {t('role')}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
                        >
                            {t('description')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25"
                                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                {t('viewProjects')} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            {cvUrl && (
                                <a href={cvUrl} download="Wilfredo_Melgar_CV.pdf" target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-2 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                                    >
                                        {t('downloadCV')} <Download className="ml-2 h-5 w-5" />
                                    </Button>
                                </a>
                            )}
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex gap-4 justify-center lg:justify-start"
                        >
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                            >
                                <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </a>
                            <a
                                href="mailto:contact@example.com"
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 flex items-center justify-center hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                            >
                                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Profile image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Decorative elements */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-20 animate-pulse" />
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30" />

                            {/* Profile image container */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
                                    <div className="w-full h-full rounded-full bg-background p-2">
                                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                                            <Image
                                                src="/profile.png"
                                                alt="Wilfredo Melgar"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badges */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className="absolute -top-4 -right-4 bg-gradient-to-br from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
                                >
                                    ✨ Available
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className="absolute -bottom-4 -left-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
                                >
                                    🚀 10+ Years
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-foreground/40"
                    />
                </div>
            </motion.div>
        </section>
    );
}
