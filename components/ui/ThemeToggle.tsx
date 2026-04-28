"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const isDark = saved ? saved === "dark" : true; // default dark
        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
        setMounted(true);
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    if (!mounted) return <div className="w-5 h-5" />;

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="text-foreground/60 hover:text-foreground transition-colors"
        >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
