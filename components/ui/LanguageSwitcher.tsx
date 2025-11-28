"use client";

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import { Button } from './Button';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const nextLocale = locale === 'es' ? 'en' : 'es';
        startTransition(() => {
            // Simple path replacement for now - can be improved for deeper routes
            // This assumes we are at root or a simple path. 
            // For a more robust solution, we'd use next-intl's Link or usePathname
            const currentPath = window.location.pathname;
            const segments = currentPath.split('/');

            // If path starts with locale (e.g. /es/about), replace it
            if (segments[1] === 'es' || segments[1] === 'en') {
                segments[1] = nextLocale;
                router.push(segments.join('/'));
            } else {
                // If no locale in path (should be handled by middleware, but just in case)
                router.push(`/${nextLocale}${currentPath}`);
            }
        });
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            disabled={isPending}
            className="flex items-center gap-2"
        >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{locale}</span>
        </Button>
    );
}
