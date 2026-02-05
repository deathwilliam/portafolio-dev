'use client';

import { useEffect } from 'react';

export default function Error({
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
                    Algo salió mal
                </h2>
                <p className="text-foreground/60 mb-6">
                    Ocurrió un error inesperado. Por favor intenta de nuevo.
                </p>
                <button
                    onClick={reset}
                    className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                    Intentar de nuevo
                </button>
            </div>
        </div>
    );
}
