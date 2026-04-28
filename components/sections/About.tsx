"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, Users } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from "next/image";

export default function About() {
    const t = useTranslations('About');

    return (
        <section id="about" className="py-12 bg-muted/30">
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
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold mb-4">
                            {t('intro')}
                        </h3>
                        <p className="text-foreground/70 mb-6 leading-relaxed">
                            {t('bio1')}
                        </p>
                        <p className="text-foreground/70 mb-8 leading-relaxed">
                            {t('bio2')}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center text-foreground/80">
                                <MapPin className="w-5 h-5 mr-2 text-primary" />
                                <span>{t('location')}</span>
                            </div>
                            <div className="flex items-center text-foreground/80">
                                <Calendar className="w-5 h-5 mr-2 text-primary" />
                                <span>{t('availability')}</span>
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
                                    <h4 className="text-lg font-bold">Consultor TI</h4>
                                    <p className="text-primary text-sm mb-2">Sector privado & ONG</p>
                                    <p className="text-foreground/60 text-sm">Consultoría en seguridad de aplicaciones web, arquitectura de software, implementación de sistemas empresariales y transformación digital para organizaciones del sector privado y sin fines de lucro.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-2xl shadow-sm border border-muted hover:border-primary/50 transition-colors overflow-hidden">
                            <div className="relative h-36 w-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
                                    alt="Capacitación"
                                    fill
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-secondary/40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                                        <Users className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-lg font-bold">Capacitador Especializado</h4>
                                <p className="text-secondary text-sm mb-2">Múltiples áreas tecnológicas</p>
                                <p className="text-foreground/60 text-sm">Formación en desarrollo web, seguridad informática, bases de datos, inteligencia artificial, automatización y robótica educativa dirigida a equipos técnicos, docentes y usuarios finales.</p>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
