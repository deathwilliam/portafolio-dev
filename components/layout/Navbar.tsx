"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";

const allNavItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Habilidades", href: "#skills" },
    { name: "Proyectos", href: "#projects" },
    { name: "Testimonios", href: "#testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const pathname = usePathname();
    const router = useRouter();

    // Determine if we are on the home page
    const isHomePage = pathname === '/' || /^\/[a-z]{2}$/.test(pathname);

    // Stable nav items
    const navItems = useMemo(() => {
        console.log("Navbar Pathname:", pathname);
        const isBlogPage = pathname?.includes('/blog');
        console.log("isBlogPage:", isBlogPage);
        return isBlogPage
            ? allNavItems.filter(item => ["Inicio", "Proyectos", "Contacto"].includes(item.name))
            : allNavItems;
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            if (isHomePage) {
                const sections = navItems.map(item => item.href.substring(1));
                const currentSection = sections.find(section => {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        return rect.top <= 100 && rect.bottom >= 100;
                    }
                    return false;
                });

                if (currentSection) {
                    setActiveSection(currentSection);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Clean up and re-run on path change to ensure correct active section logic
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage, navItems, pathname]);

    const scrollToSection = (href: string) => {
        setIsMobileMenuOpen(false);

        // Get current locale
        const segments = pathname.split('/').filter(Boolean);
        const locale = (segments.length > 0 && ['es', 'en'].includes(segments[0])) ? segments[0] : 'es';

        if (href.startsWith('#')) {
            if (isHomePage) {
                const element = document.querySelector(href);
                element?.scrollIntoView({ behavior: "smooth" });
            } else {
                router.push(`/${locale}${href}`);
            }
        } else {
            // It's a page navigation (like /blog)
            router.push(`/${locale}${href}`);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/95 backdrop-blur-md shadow-md"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.button
                            onClick={() => scrollToSection("#hero")}
                            className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Wilfredo Melgar
                        </motion.button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.href)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === item.href.substring(1)
                                        ? "text-primary bg-primary/10"
                                        : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-16 right-0 bottom-0 w-64 bg-background/98 backdrop-blur-lg shadow-2xl z-50 md:hidden"
                    >
                        <div className="flex flex-col p-6 space-y-2">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => scrollToSection(item.href)}
                                    className={`px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${activeSection === item.href.substring(1)
                                        ? "text-primary bg-primary/10 shadow-sm"
                                        : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
