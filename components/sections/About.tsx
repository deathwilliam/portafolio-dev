"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold mb-4">
                            I&apos;m a passionate developer creating modern web solutions.
                        </h3>
                        <p className="text-foreground/70 mb-6 leading-relaxed">
                            With over 5 years of experience in full-stack development, I specialize in building scalable, secure, and user-friendly applications. My journey started with a curiosity for how things work on the web, which evolved into a career of solving complex problems with elegant code.
                        </p>
                        <p className="text-foreground/70 mb-8 leading-relaxed">
                            I thrive in collaborative environments and enjoy mentoring junior developers. When I&apos;m not coding, you can find me exploring new technologies, contributing to open source, or hiking in nature.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center text-foreground/80">
                                <MapPin className="w-5 h-5 mr-2 text-primary" />
                                <span>San Francisco, CA</span>
                            </div>
                            <div className="flex items-center text-foreground/80">
                                <Calendar className="w-5 h-5 mr-2 text-primary" />
                                <span>Available now</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="bg-background p-6 rounded-2xl shadow-sm border border-muted hover:border-primary/50 transition-colors">
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                                    <Briefcase className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Senior Frontend Developer</h4>
                                    <p className="text-primary text-sm mb-2">Tech Corp • 2021 - Present</p>
                                    <p className="text-foreground/60 text-sm">Leading the frontend team in rebuilding the core product using Next.js and React.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background p-6 rounded-2xl shadow-sm border border-muted hover:border-primary/50 transition-colors">
                            <div className="flex items-start">
                                <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                                    <Briefcase className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Full Stack Developer</h4>
                                    <p className="text-secondary text-sm mb-2">StartUp Inc • 2019 - 2021</p>
                                    <p className="text-foreground/60 text-sm">Developed and maintained multiple client projects using Laravel and Vue.js.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background p-6 rounded-2xl shadow-sm border border-muted hover:border-primary/50 transition-colors">
                            <div className="flex items-start">
                                <div className="bg-accent/10 p-3 rounded-lg mr-4">
                                    <GraduationCap className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">BS Computer Science</h4>
                                    <p className="text-accent text-sm mb-2">University of Tech • 2015 - 2019</p>
                                    <p className="text-foreground/60 text-sm">Focus on Software Engineering and Human-Computer Interaction.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
