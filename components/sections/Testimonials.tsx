"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useTranslations } from 'next-intl';

interface Testimonial {
    _id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    image?: any;
    rating: number;
}

interface TestimonialsProps {
    initialTestimonials: Testimonial[];
}

export default function Testimonials({ initialTestimonials = [] }: TestimonialsProps) {
    const t = useTranslations('Testimonials');

    if (!initialTestimonials.length) {
        return null;
    }

    return (
        <section id="testimonials" className="py-20">
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
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initialTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-background p-6 rounded-2xl shadow-sm border border-muted hover:border-primary/50 hover:shadow-md transition-all group flex flex-col"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating
                                            ? "text-yellow-500 fill-yellow-500"
                                            : "text-muted"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-foreground/70 mb-6 leading-relaxed flex-1 italic">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-muted">
                                {testimonial.image && (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                                        <Image
                                            src={urlFor(testimonial.image).url()}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-sm">{testimonial.name}</h4>
                                    <p className="text-xs text-foreground/60">
                                        {testimonial.role}
                                        {testimonial.company && ` • ${testimonial.company}`}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
