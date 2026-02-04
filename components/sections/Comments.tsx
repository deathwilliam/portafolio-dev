"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { getComments, createComment } from "@/lib/data";
import { User, MessageSquare } from "lucide-react";

interface Comment {
    id: string;
    name: string;
    content: string;
    createdAt: string | Date;
}

interface CommentsProps {
    slug: string;
}

export default function Comments({ slug }: CommentsProps) {
    const t = useTranslations('Comments');

    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        content: ""
    });
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    useEffect(() => {
        loadComments();
    }, [slug]);

    async function loadComments() {
        try {
            const data = await getComments(slug);
            setComments(data || []);
        } catch (error) {
            console.error("Error loading comments:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

        try {
            await createComment({
                post_slug: slug,
                name: formData.name,
                email: formData.email,
                content: formData.content
            });

            setStatus("success");
            setFormData({ name: "", email: "", content: "" });
            loadComments(); // Reload comments

            // Clear success message after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error("Error posting comment:", error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="mt-16 pt-16 border-t border-muted">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-primary" />
                {t('title')} ({comments.length})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-16 bg-muted/30 p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            {t('name')}
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            {t('email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-sm font-medium mb-2">
                        {t('message')}
                    </label>
                    <textarea
                        id="content"
                        required
                        rows={4}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? t('submitting') : t('submit')}
                    </Button>
                    {status === "success" && (
                        <span className="text-green-600 text-sm font-medium">{t('success')}</span>
                    )}
                    {status === "error" && (
                        <span className="text-red-600 text-sm font-medium">{t('error')}</span>
                    )}
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-8">
                {isLoading ? (
                    <p className="text-center text-foreground/60">{t('loading')}</p>
                ) : comments.length === 0 ? (
                    <p className="text-center text-foreground/60 py-8 bg-muted/20 rounded-xl">
                        {t('noComments')}
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold">{comment.name}</h4>
                                    <span className="text-xs text-foreground/60">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-foreground/80 leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
