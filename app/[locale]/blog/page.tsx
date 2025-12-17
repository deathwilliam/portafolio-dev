import { getPosts } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const revalidate = 60;

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    image_url?: string;
    published_at: string;
}

export default async function BlogPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    let posts: BlogPost[] = [];
    try {
        posts = await getPosts() as BlogPost[];
    } catch (e) {
        console.error("Error fetching posts:", e);
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                        {locale === 'es'
                            ? 'Explora mis últimos artículos, tutoriales y pensamientos sobre desarrollo web y tecnología.'
                            : 'Explore my latest articles, tutorials, and thoughts on web development and technology.'}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-background rounded-2xl overflow-hidden shadow-sm border border-muted hover:border-primary/50 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Cover Image */}
                            {post.image_url && (
                                <div className="relative h-48 overflow-hidden shrink-0">
                                    <Image
                                        src={post.image_url}
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
                                        {formatDate(post.published_at)}
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

                                {/* Read More Button */}
                                <Link
                                    href={`/${locale}/blog/${post.slug}`}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "sm" }),
                                        "w-full justify-between group/btn mt-auto"
                                    )}
                                >
                                    <span className="flex items-center w-full justify-between">
                                        {locale === 'es' ? 'Leer más' : 'Read More'}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
