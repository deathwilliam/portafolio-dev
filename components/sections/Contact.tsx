"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Contact() {
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi? I&apos;d love to hear from you.
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
                            <h3 className="text-2xl font-bold mb-6">Let&apos;s build something amazing together</h3>
                            <p className="text-foreground/70 mb-8">
                                I&apos;m currently available for freelance projects and open to full-time opportunities.
                                If you have a question or just want to connect, feel free to reach out!
                            </p>

                            <div className="space-y-6">
                                <a href="mailto:hello@example.com" className="flex items-center p-4 bg-background rounded-xl hover:shadow-md transition-all group">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Mail className="w-6 h-6 text-primary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/50">Email me at</p>
                                        <p className="font-medium text-lg">hello@example.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center p-4 bg-background rounded-xl hover:shadow-md transition-all group">
                                    <div className="bg-secondary/10 p-3 rounded-full mr-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                                        <MessageSquare className="w-6 h-6 text-secondary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/50">Socials</p>
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
                        <form className="space-y-6 bg-background p-8 rounded-3xl shadow-lg border border-muted">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <Button className="w-full" size="lg">
                                Send Message <Send className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
