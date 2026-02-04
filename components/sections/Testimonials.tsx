"use client";

import { useState } from "react";
import { Star, Plus, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { createTestimonial } from "@/lib/data";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    imageUrl?: string;
    rating: number;
}

interface TestimonialsProps {
    initialTestimonials: Testimonial[];
}

export default function Testimonials({ initialTestimonials = [] }: TestimonialsProps) {
    const t = useTranslations('Testimonials');

    // Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        company: "",
        content: "",
        rating: 5,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createTestimonial({
                ...formData,
                approved: false // Enforce approval workflow
            });
            setShowSuccess(true);
            setFormData({ name: "", role: "", company: "", content: "", rating: 5 });
            setTimeout(() => {
                setShowSuccess(false);
                setIsModalOpen(false);
            }, 3000);
        } catch (error) {
            console.error("Error submitting testimonial:", error);
            alert(t('error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="testimonials" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                    <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        {t('leaveReview')}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initialTestimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-md transition-all group flex flex-col"
                        >
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

                            <p className="text-foreground/70 mb-6 leading-relaxed flex-1 italic">
                                &quot;{testimonial.content}&quot;
                            </p>

                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                {testimonial.imageUrl ? (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                                        <Image
                                            src={testimonial.imageUrl}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                                        {testimonial.name[0]}
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Submission Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-xl font-bold">{t('leaveReview')}</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {showSuccess ? (
                                <div className="p-12 text-center text-green-600">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Plus className="w-8 h-8 rotate-45" />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Thank you!</h4>
                                    <p className="text-foreground/60">Your review has been submitted and is pending approval.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('form.name')}</label>
                                            <input
                                                required
                                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('form.role')}</label>
                                            <input
                                                required
                                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('form.company')}</label>
                                        <input
                                            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('form.rating')}</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, rating: star })}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`w-6 h-6 ${formData.rating >= star
                                                            ? "text-yellow-500 fill-yellow-500"
                                                            : "text-muted"
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('form.review')}</label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-4 flex justify-end gap-3">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            {t('cancel')}
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="min-w-[100px]"
                                        >
                                            {isSubmitting ? "..." : t('submit')}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
