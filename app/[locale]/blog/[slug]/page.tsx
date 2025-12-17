import { getPost } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Comments from "@/components/sections/Comments";

export const revalidate = 60;

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    image_url?: string;
    published_at: string;
    content: string; // Markdown content
}

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    let post: BlogPost | null = null;

    try {
        post = await getPost(slug) as BlogPost;
    } catch (e) {
        console.error("Error fetching post:", e);
    }

    if (!post) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <article className="min-h-screen bg-background pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href={`/${locale}/blog`}
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "inline-flex gap-2 pl-0 hover:pl-2 transition-all mb-8"
                    )}
                >
                    <ArrowLeft className="w-4 h-4" />
                    {locale === 'es' ? 'Volver al Blog' : 'Back to Blog'}
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-6">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.published_at)}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>
                </header>

                {/* Cover Image */}
                {post.image_url && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-12 shadow-lg">
                        <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/80 prose-li:text-foreground/80 prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline">
                    <ReactMarkdown
                        components={{
                            img: ({ node, ...props }) => (
                                <div className="relative aspect-video w-full overflow-hidden rounded-xl my-8">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        {...props}
                                        alt={props.alt || 'Blog image'}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                <Comments slug={slug} />
            </div>
        </article>
    );
}
