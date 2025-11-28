"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";

const socialLinks = [
    {
        name: "GitHub",
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/deathwilliam",
        color: "hover:text-gray-400"
    },
    {
        name: "LinkedIn",
        icon: <Linkedin className="w-5 h-5" />,
        href: "https://linkedin.com/in/wilfredo-melgar",
        color: "hover:text-blue-400"
    },
    {
        name: "Twitter",
        icon: <Twitter className="w-5 h-5" />,
        href: "https://twitter.com/wilfredomelgar",
        color: "hover:text-sky-400"
    },
    {
        name: "Email",
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:wilfredo.melgar@example.com",
        color: "hover:text-red-400"
    },
];

const quickLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="bg-muted/30 border-t border-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-3">
                            Wilfredo Melgar
                        </h3>
                        <p className="text-foreground/60 text-sm mb-4">
                            Ingeniero en Sistemas especializado en desarrollo web full-stack.
                            Creando soluciones tecnológicas innovadoras.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-foreground/60 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-lg font-semibold mb-4">Conecta Conmigo</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 bg-background rounded-lg border border-muted transition-all ${social.color}`}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-8 border-t border-muted text-center"
                >
                    <p className="text-foreground/60 text-sm flex items-center justify-center gap-2">
                        © {currentYear} Wilfredo Melgar. Hecho con
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                        y Next.js
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
