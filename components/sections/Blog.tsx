"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Button } from "@/components/ui/Button";
import { useTranslations, useLocale } from 'next-intl';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    coverImage: object;
    publishedAt: string;
    tags?: string[];
}

interface BlogProps {
    initialPosts: BlogPost[];
}

export default function Blog({ initialPosts = [] }: BlogProps) {
    const t = useTranslations('Blog');
    const locale = useLocale();

    if (!initialPosts.length) {
        return null;
    }

    // Show only the latest 3 posts
    const latestPosts = initialPosts.slice(0, 3);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section id="blog" className="py-20 bg-muted/30">
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
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map((post, index) => (
                        <motion.article
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-background rounded-2xl overflow-hidden shadow-sm border border-muted hover:border-primary/50 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Cover Image */}
                            {post.coverImage && (
                                <div className="relative h-48 overflow-hidden shrink-0">
                                    <Image
                                        src={urlFor(post.coverImage).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                {/* Date */}
                                <div className="flex items-center gap-4 text-xs text-foreground/60 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {formatDate(post.publishedAt)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {t('readTime')}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                {post.excerpt && (
                                    <p className="text-foreground/70 mb-4 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>
                                )}

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Read More Button */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-between mt-auto group/btn"
                                >
                                    {t('readMore')}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Posts Button */}
                {initialPosts.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <Button size="lg" variant="outline">
                            {t('viewAll')}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
