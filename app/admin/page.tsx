"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, LayoutDashboard, FileText, Trash2, Pencil, Plus, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
    getContactMessages, deleteContactMessage,
    getProjects, deleteProject, createProject, updateProject,
    getTestimonials, deleteTestimonial, createTestimonial, updateTestimonialStatus,
    getPosts,
    getSiteSettings,
    supabase
} from "@/lib/supabase";
import { uploadCV, uploadImage } from "./actions";

export default function AdminDashboard() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [projects, setProjects] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [testimonials, setTestimonials] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [cvUrl, setCvUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Project Modal State
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [projectSaving, setProjectSaving] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingProject, setEditingProject] = useState<any>(null);

    // Blog Post Modal State
    const [showPostModal, setShowPostModal] = useState(false);
    const [postSaving, setPostSaving] = useState(false);

    // Testimonial Modal State
    const [showTestimonialModal, setShowTestimonialModal] = useState(false);
    const [testimonialSaving, setTestimonialSaving] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [msgs, projs, tests, posts, settings] = await Promise.all([
                getContactMessages().catch(() => []),
                getProjects().catch(() => []),
                getTestimonials().catch(() => []),
                getPosts().catch(() => []),
                getSiteSettings().catch(() => null)
            ]);

            setMessages(msgs || []);
            setProjects(projs || []);
            setTestimonials(tests || []);
            setBlogPosts(posts || []);
            setCvUrl(settings?.cv_url || null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este mensaje?")) {
            return;
        }

        setDeleting(id);
        try {
            await deleteContactMessage(id);
            setMessages(messages.filter(msg => msg.id !== id));
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("Error al eliminar el mensaje");
        } finally {
            setDeleting(null);
        }
    };

    const handleDeleteBlogPost = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar esta publicación?")) return;
        setDeleting(id);
        try {
            const { error } = await supabase.from('posts').delete().eq('id', id);
            if (error) throw error;
            setBlogPosts(blogPosts.filter(p => p.id !== id));
        } catch (e) {
            console.error(e);
            alert("Error al eliminar la publicación");
        } finally {
            setDeleting(null);
        }
    };

    const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPostSaving(true);
        const formData = new FormData(e.currentTarget);

        const newPost = {
            title: formData.get('title') as string,
            slug: formData.get('slug') as string,
            excerpt: formData.get('excerpt') as string,
            content: formData.get('content') as string,
            image_url: formData.get('image_url') as string,
            published_at: new Date().toISOString(),
        };

        try {
            const { error } = await supabase.from('posts').insert([newPost]);
            if (error) throw error;

            setShowPostModal(false);
            fetchData();
            alert("¡Publicación creada!");
        } catch (e: any) {
            console.error(e);
            alert("Error al crear la publicación: " + e.message);
        } finally {
            setPostSaving(false);
        }
    };

    // Testimonial Actions
    const handleDeleteTestimonial = async (id: string) => {
        if (!confirm("¿Eliminar este testimonio?")) return;
        setDeleting(id);
        try {
            await deleteTestimonial(id);
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (e) {
            console.error(e);
            alert("Error al eliminar el testimonio");
        } finally {
            setDeleting(null);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditTestimonial = (testimonial: any) => {
        setEditingTestimonial(testimonial);
        setShowTestimonialModal(true);
    };

    const handleTestimonialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTestimonialSaving(true);
        const formData = new FormData(e.currentTarget);

        const imageFile = formData.get('image') as File;
        let imageUrl = formData.get('image_url') as string;

        try {
            if (imageFile && imageFile.size > 0) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', imageFile);
                const res = await uploadImage(uploadFormData);
                if (!res.success) throw new Error(res.error);
                imageUrl = res.url || '';
            }

            const testimonialData = {
                name: formData.get('name'),
                role: formData.get('role'),
                company: formData.get('company'),
                content: formData.get('content'),
                rating: parseInt(formData.get('rating') as string),
                image_url: imageUrl,
            };

            if (editingTestimonial) {
                const { error } = await supabase
                    .from('testimonials')
                    .update(testimonialData)
                    .eq('id', editingTestimonial.id);
                if (error) throw error;
            } else {
                await createTestimonial(testimonialData);
            }
            setShowTestimonialModal(false);
            setEditingTestimonial(null);
            fetchData();
            alert("¡Testimonio guardado!");
        } catch (e: any) {
            console.error(e);
            alert("Error al guardar el testimonio: " + e.message + "\n(Asegúrate de que el bucket 'resume' exista)");
        } finally {
            setTestimonialSaving(false);
        }
    };

    const handleApproveTestimonial = async (id: string, currentStatus: true | false) => {
        try {
            await updateTestimonialStatus(id, !currentStatus);
            fetchData();
        } catch (e: any) {
            console.error(e);
            alert("Error al actualizar el estado: " + e.message);
        }
    };

    // Project Actions
    const handleDeleteProject = async (id: string) => {
        if (!confirm("¿Eliminar este proyecto?")) return;
        setDeleting(id);
        try {
            await deleteProject(id);
            setProjects(projects.filter(p => p.id !== id));
        } catch (e) {
            console.error(e);
            alert("Error al eliminar el proyecto");
        } finally {
            setDeleting(null);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditProject = (project: any) => {
        setEditingProject(project);
        setShowProjectModal(true);
    };

    const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProjectSaving(true);
        const formData = new FormData(e.currentTarget);

        const imageFile = formData.get('image') as File;
        let imageUrl = formData.get('image_url') as string;

        try {
            if (imageFile && imageFile.size > 0) {
                // Upload image if file provided
                const uploadFormData = new FormData();
                uploadFormData.append('image', imageFile);
                const res = await uploadImage(uploadFormData);
                if (!res.success) throw new Error(res.error);
                imageUrl = res.url || '';
            }

            const projectData = {
                title: formData.get('title'),
                slug: formData.get('title')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                category: formData.get('category'),
                description: formData.get('description'),
                image_url: imageUrl,
                link: formData.get('link'),
                github_link: formData.get('github_link'),
            };

            if (editingProject) {
                await updateProject(editingProject.id, projectData);
            } else {
                await createProject(projectData);
            }
            setShowProjectModal(false);
            setEditingProject(null);
            fetchData();
            alert("¡Proyecto guardado!");
        } catch (e: any) {
            console.error(e);
            alert("Error al guardar el proyecto: " + e.message + "\n(Asegúrate de que el bucket 'resume' exista y sea público)");
        } finally {
            setProjectSaving(false);
        }
    };

    const openCreateModal = () => {
        setEditingProject(null);
        setShowProjectModal(true);
    };

    const openCreateTestimonial = () => {
        setEditingTestimonial(null);
        setShowTestimonialModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/60">Total Messages</p>
                                <h3 className="text-2xl font-bold">{messages.length}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                                    <LayoutDashboard className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60">Projects</p>
                                    <h3 className="text-2xl font-bold">{projects.length}</h3>
                                </div>
                            </div>
                            <Button
                                onClick={openCreateModal}
                                size="sm"
                                variant="outline"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500">
                                    <Star className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60">Testimonials</p>
                                    <h3 className="text-2xl font-bold">{testimonials.length}</h3>
                                </div>
                            </div>
                            <Button
                                onClick={openCreateTestimonial}
                                size="sm"
                                variant="outline"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-full text-purple-500">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/60">CV / Currículum</p>
                                <h3 className="text-lg font-bold truncate max-w-[120px]">
                                    {cvUrl ? "Subido" : "Sin archivo"}
                                </h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {cvUrl && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(cvUrl, '_blank')}
                                    className="w-full"
                                >
                                    Ver CV Actual
                                </Button>
                            )}
                            <form action={async (formData) => {
                                if (!confirm("¿Subir nuevo CV?")) return;
                                const res = await uploadCV(formData);
                                if (res.success) {
                                    alert("¡CV Subido!");
                                    fetchData();
                                } else {
                                    alert("Falló: " + res.error);
                                }
                            }}>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="cv"
                                        accept=".pdf"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => e.target.form?.requestSubmit()}
                                    />
                                    <Button size="sm" variant="ghost" className="w-full border-dashed border-2 border-muted-foreground/20">
                                        {cvUrl ? "Actualizar PDF" : "Subir PDF"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Projects */}
                    <div className="space-y-8">
                        {/* Projects Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden h-fit">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold">Recent Projects</h2>
                            </div>
                            <div className="divide-y divide-muted">
                                {loading ? (
                                    <div className="p-8 text-center text-foreground/60">Loading projects...</div>
                                ) : projects.length === 0 ? (
                                    <div className="p-8 text-center text-foreground/60">No projects yet.</div>
                                ) : (
                                    projects.slice(0, 5).map((project) => (
                                        <div key={project.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                {project.image_url && (
                                                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden relative">
                                                        <Image
                                                            src={project.image_url}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-medium">{project.title}</h4>
                                                    <p className="text-xs text-foreground/50">{project.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditProject(project)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    disabled={deleting === project.id}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Testimonials Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden h-fit">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold">Testimonials</h2>
                                <Button size="sm" onClick={openCreateTestimonial} variant="outline">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add
                                </Button>
                            </div>
                            <div className="divide-y divide-muted">
                                {loading ? (
                                    <div className="p-8 text-center text-foreground/60">Loading testimonials...</div>
                                ) : testimonials.length === 0 ? (
                                    <div className="p-8 text-center text-foreground/60">No testimonials yet.</div>
                                ) : (
                                    testimonials.map((t) => (
                                        <div key={t.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                {t.image_url && (
                                                    <div className="w-12 h-12 rounded-full bg-muted overflow-hidden relative">
                                                        <Image
                                                            src={t.image_url}
                                                            alt={t.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-medium flex items-center gap-2">
                                                        {t.name}
                                                        {t.approved ? (
                                                            <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] border border-green-200">
                                                                Approved
                                                            </span>
                                                        ) : (
                                                            <span className="px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-[10px] border border-yellow-200">
                                                                Pending
                                                            </span>
                                                        )}
                                                    </h4>
                                                    <p className="text-xs text-foreground/50">{t.role} @ {t.company}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={t.approved ? "text-amber-600 hover:text-amber-700" : "text-green-600 hover:text-green-700"}
                                                    onClick={() => handleApproveTestimonial(t.id, t.approved || false)}
                                                >
                                                    {t.approved ? "Unapprove" : "Approve"}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditTestimonial(t)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDeleteTestimonial(t.id)}
                                                    disabled={deleting === t.id}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Blog & Messages */}
                    <div className="space-y-8">
                        {/* Blog Posts Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold">Recent Blog Posts</h2>
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={() => setShowPostModal(true)}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create
                                    </Button>
                                </div>
                            </div>
                            <div className="divide-y divide-muted">
                                {loading ? (
                                    <div className="p-8 text-center text-foreground/60">Loading posts...</div>
                                ) : blogPosts.length === 0 ? (
                                    <div className="p-8 text-center text-foreground/60">No blog posts yet.</div>
                                ) : (
                                    blogPosts.slice(0, 5).map((post) => (
                                        <div key={post.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                {post.image_url && (
                                                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden relative">
                                                        <Image
                                                            src={post.image_url}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-medium line-clamp-1">{post.title}</h4>
                                                    <p className="text-xs text-foreground/50">
                                                        {new Date(post.published_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDeleteBlogPost(post.id)}
                                                    disabled={deleting === post.id}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Recent Messages Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold">Recent Messages</h2>
                            </div>
                            <div className="divide-y divide-muted">
                                {loading ? (
                                    <div className="p-8 text-center text-foreground/60">Loading messages...</div>
                                ) : messages.length === 0 ? (
                                    <div className="p-8 text-center text-foreground/60">No messages yet.</div>
                                ) : (
                                    messages.map((msg) => (
                                        <div key={msg.id} className="p-6 hover:bg-muted/30 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{msg.name}</h4>
                                                    <p className="text-sm text-foreground/60">{msg.email}</p>
                                                    {msg.phone && <p className="text-xs text-foreground/50">{msg.phone}</p>}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-foreground/40">
                                                        {new Date(msg.created_at).toLocaleDateString()}
                                                    </span>
                                                    <Button
                                                        onClick={() => handleDelete(msg.id)}
                                                        disabled={deleting === msg.id}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="font-medium text-sm mb-1">{msg.subject}</p>
                                            <p className="text-foreground/70 text-sm">{msg.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Modal (Create/Edit) */}
                {showProjectModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold">{editingProject ? "Editar Proyecto" : "Crear Nuevo Proyecto"}</h2>
                                <button onClick={() => setShowProjectModal(false)} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    <span className="sr-only">Close</span>
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Título</label>
                                    <input
                                        name="title"
                                        required
                                        defaultValue={editingProject?.title}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Categoría</label>
                                    <select
                                        name="category"
                                        defaultValue={editingProject?.category}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    >
                                        <option value="Full Stack">Full Stack</option>
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Mobile">Mobile</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Descripción</label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={3}
                                        defaultValue={editingProject?.description}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Imagen (Subir archivo o URL)</label>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                        />
                                        <input
                                            name="image_url"
                                            placeholder="o pegar URL https://..."
                                            defaultValue={editingProject?.image_url}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <Button type="button" variant="ghost" onClick={() => setShowProjectModal(false)}>Cancelar</Button>
                                    <Button type="submit" disabled={projectSaving}>
                                        {projectSaving ? "Guardando..." : (editingProject ? "Actualizar Proyecto" : "Crear Proyecto")}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Blog Post Modal (Create) */}
                {showPostModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-background rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-muted flex justify-between items-center">
                                <h2 className="text-xl font-bold">Crear Nueva Publicación de Blog</h2>
                                <button onClick={() => setShowPostModal(false)} className="text-foreground/60 hover:text-foreground">
                                    <span className="sr-only">Close</span>
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={handlePostSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Título</label>
                                    <input
                                        name="title"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20"
                                        onChange={(e) => {
                                            // Auto-generate slug
                                            const slugInput = document.querySelector('input[name="slug"]') as HTMLInputElement;
                                            if (slugInput && !slugInput.value) {
                                                slugInput.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Slug</label>
                                    <input
                                        name="slug"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Extracto</label>
                                    <textarea
                                        name="excerpt"
                                        required
                                        rows={2}
                                        className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">URL de Imagen</label>
                                    <input
                                        name="image_url"
                                        required
                                        placeholder="https://..."
                                        className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Contenido (Markdown)</label>
                                    <textarea
                                        name="content"
                                        required
                                        rows={6}
                                        className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20"
                                    />
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <Button type="button" variant="ghost" onClick={() => setShowPostModal(false)}>Cancelar</Button>
                                    <Button type="submit" disabled={postSaving}>
                                        {postSaving ? "Creando..." : "Crear Publicación"}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Testimonial Modal */}
                {showTestimonialModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold">{editingTestimonial ? "Editar Testimonio" : "Crear Testimonio"}</h2>
                                <button onClick={() => setShowTestimonialModal(false)} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    <span className="sr-only">Close</span>
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={handleTestimonialSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nombre</label>
                                    <input
                                        name="name"
                                        required
                                        defaultValue={editingTestimonial?.name}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Cargo / Rol</label>
                                    <input
                                        name="role"
                                        required
                                        defaultValue={editingTestimonial?.role}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Empresa</label>
                                    <input
                                        name="company"
                                        defaultValue={editingTestimonial?.company}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Reseña</label>
                                    <textarea
                                        name="content"
                                        required
                                        rows={3}
                                        defaultValue={editingTestimonial?.content}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Calificación (1-5)</label>
                                    <input
                                        name="rating"
                                        type="number"
                                        min="1"
                                        max="5"
                                        defaultValue={editingTestimonial?.rating || 5}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Imagen (Subir archivo o URL)</label>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                        />
                                        <input
                                            name="image_url"
                                            placeholder="o pegar URL https://..."
                                            defaultValue={editingTestimonial?.image_url}
                                            className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <Button type="button" variant="ghost" onClick={() => setShowTestimonialModal(false)}>Cancelar</Button>
                                    <Button type="submit" disabled={testimonialSaving}>
                                        {testimonialSaving ? "Guardando..." : (editingTestimonial ? "Actualizar" : "Crear")}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
