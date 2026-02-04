"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitContactForm } from "@/lib/data";
import { useTranslations } from 'next-intl';

export default function Contact() {
    const t = useTranslations('Contact');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");
        setErrorMessage("");

        try {
            // Save to Supabase
            await submitContactForm(formData);

            // Send email notification
            const emailRes = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!emailRes.ok) {
                const errorData = await emailRes.json();
                throw new Error(errorData.error || "Failed to send email");
            }

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setStatus("error");
            // Show the actual error message if available, otherwise fallback
            setErrorMessage(error.message || t('error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-muted/30 p-8 rounded-3xl border border-muted">
                            <h3 className="text-2xl font-bold mb-6">{t('collabTitle')}</h3>
                            <p className="text-foreground/70 mb-8">
                                {t('collabDesc')}
                            </p>

                            <div className="space-y-6">
                                <a href="mailto:hello@example.com" className="flex items-center p-4 bg-background rounded-xl hover:shadow-md transition-all group">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Mail className="w-6 h-6 text-primary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/50">{t('emailLabel')}</p>
                                        <p className="font-medium text-lg">melgar.wilfredo@gmail.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center p-4 bg-background rounded-xl hover:shadow-md transition-all group">
                                    <div className="bg-secondary/10 p-3 rounded-full mr-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                                        <MessageSquare className="w-6 h-6 text-secondary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/50">{t('socialsLabel')}</p>
                                        <p className="font-medium text-lg">@username</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-3xl shadow-lg border border-muted">
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-green-700">{t('successTitle')}</h3>
                                    <p className="text-foreground/70">{t('successMessage')}</p>
                                    <Button variant="outline" onClick={() => setStatus("idle")}>
                                        {t('sendAnother')}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">{t('name')}</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder={t('namePlaceholder')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">{t('email')}</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder={t('emailPlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">{t('phone')}</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder={t('phonePlaceholder')}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">{t('subject')}</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder={t('subjectPlaceholder')}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                            placeholder={t('messagePlaceholder')}
                                        />
                                    </div>

                                    {status === "error" && (
                                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            {errorMessage}
                                        </div>
                                    )}

                                    <Button className="w-full" size="lg" disabled={loading}>
                                        {loading ? (
                                            <>{t('sending')} <Loader2 className="ml-2 w-4 h-4 animate-spin" /></>
                                        ) : (
                                            <>{t('send')} <Send className="ml-2 w-4 h-4" /></>
                                        )}
                                    </Button>
                                </>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
