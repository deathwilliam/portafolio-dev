"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-muted py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-primary mb-2">
                            Portfolio<span className="text-accent">.</span>
                        </h3>
                        <p className="text-foreground/60 text-sm max-w-xs">
                            Building digital experiences with modern technologies and passion for design.
                        </p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/60 hover:text-primary transition-colors transform hover:scale-110 duration-200"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/60 hover:text-primary transition-colors transform hover:scale-110 duration-200"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="mailto:contact@example.com"
                            className="text-foreground/60 hover:text-primary transition-colors transform hover:scale-110 duration-200"
                        >
                            <Mail size={24} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-muted/50 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/50">
                    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                    <p className="flex items-center mt-2 md:mt-0">
                        Made with <Heart size={14} className="mx-1 text-red-500 fill-red-500" /> using Next.js & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    );
}
