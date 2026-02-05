'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Error al cargar el blog
                </h2>
                <p className="text-foreground/60 mb-6">
                    No se pudo cargar el contenido del blog. Por favor intenta de nuevo.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                    >
                        Intentar de nuevo
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-lg border border-white/10 text-foreground font-medium hover:bg-muted/50 transition-colors"
                    >
                        Ir al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
