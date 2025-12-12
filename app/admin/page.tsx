"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ExternalLink, LayoutDashboard, FileText, Trash2, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getContactMessages, deleteContactMessage } from "@/lib/supabase";

import React from "react";

export default function AdminDashboard() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [projects, setProjects] = useState<any[]>([]);
    const [cvUrl, setCvUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Project Modal State
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [projectSaving, setProjectSaving] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingProject, setEditingProject] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { getProjectsFromAdmin, getSiteSettings } = await import('./actions');

            const [msgs, projs, settings] = await Promise.all([
                getContactMessages().catch(() => []),
                getProjectsFromAdmin().catch(() => []),
                getSiteSettings().catch(() => null)
            ]);
            setMessages(msgs || []);
            setProjects(projs || []);
            setCvUrl(settings?.cvUrl || null);
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

    // Project Actions
    const handleDeleteProject = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este proyecto?")) return;
        setDeleting(id);
        try {
            const { deleteProject } = await import('./actions');
            const result = await deleteProject(id);
            if (result.success) {
                fetchData();
            } else {
                alert("Error: " + result.error);
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting project");
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

        try {
            const { createProject, updateProject } = await import('./actions');
            let result;

            if (editingProject) {
                // Add ID for update
                formData.append('id', editingProject._id);
                result = await updateProject(formData);
            } else {
                result = await createProject(formData);
            }

            if (result.success) {
                setShowProjectModal(false);
                setEditingProject(null);
                alert(editingProject ? "Project updated!" : "Project created!");
                fetchData();
            } else {
                alert("Failed: " + (result.error || "Unknown error"));
            }
        } catch (e) {
            console.error(e);
            alert("An error occurred");
        } finally {
            setProjectSaving(false);
        }
    };

    const openCreateModal = () => {
        setEditingProject(null);
        setShowProjectModal(true);
    };

    return (
        <div className="min-h-screen bg-muted/30 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <Button onClick={() => window.open("/studio", "_blank")} variant="outline">
                        Open Sanity Studio <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-muted">
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

                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-muted">
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

                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-muted">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-full text-purple-500">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/60">CV / Resume</p>
                                <h3 className="text-lg font-bold truncate max-w-[120px]">
                                    {cvUrl ? "Uploaded" : "No file"}
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
                                    View Current CV
                                </Button>
                            )}
                            <form action={async (formData) => {
                                const { uploadCV } = await import('./actions');
                                if (!confirm("Upload new CV?")) return;
                                const res = await uploadCV(formData);
                                if (res.success) {
                                    alert("CV Uploaded!");
                                    fetchData();
                                } else {
                                    alert("Failed: " + res.error);
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
                                        {cvUrl ? "Update PDF" : "Upload PDF"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-background rounded-2xl shadow-sm border border-muted overflow-hidden">
                        <div className="p-6 border-b border-muted flex justify-between items-center">
                            <h2 className="text-xl font-bold">Recent Projects</h2>
                            <Button variant="ghost" onClick={() => window.open("/studio/structure/project", "_blank")}>
                                View All
                            </Button>
                        </div>
                        <div className="divide-y divide-muted">
                            {loading ? (
                                <div className="p-8 text-center text-foreground/60">Loading projects...</div>
                            ) : projects.length === 0 ? (
                                <div className="p-8 text-center text-foreground/60">No projects yet.</div>
                            ) : (
                                projects.slice(0, 5).map((project) => (
                                    <div key={project._id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            {project.image && (
                                                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden relative">
                                                    {/* We can use urlFor here if we import it, but for simple list a placeholder or just title is fine for now if no image builder imported in this file directly, 
                                                        but better to keep it simple. */}
                                                    <Image
                                                        src={project.imageUrl || "https://placehold.co/100x100"}
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
                                                onClick={() => handleDeleteProject(project._id)}
                                                disabled={deleting === project._id}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-background rounded-2xl shadow-sm border border-muted overflow-hidden">
                        <div className="p-6 border-b border-muted">
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
                        className="bg-background rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                    >
                        <div className="p-6 border-b border-muted flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editingProject ? "Edit Project" : "Create New Project"}</h2>
                            <button onClick={() => setShowProjectModal(false)} className="text-foreground/60 hover:text-foreground">
                                <span className="sr-only">Close</span>
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    name="title"
                                    required
                                    defaultValue={editingProject?.title}
                                    className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    name="category"
                                    defaultValue={editingProject?.category}
                                    className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20"
                                >
                                    <option value="Full Stack">Full Stack</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Mobile">Mobile</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={3}
                                    defaultValue={editingProject?.description} // Note: description might not be in the list fetch projection, might need fetching?
                                    // For simplicity, assuming description isn't used or we add it to fetch. 
                                    // Wait, getAdminProjects doesn't fetch description currently!
                                    // I should probably fetch description in getAdminProjects or fetch full doc on Edit.
                                    // Let's add description to getAdminProjects projection for smoother UX.
                                    className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image {editingProject && "(Leave empty to keep existing)"}</label>
                                <input type="file" name="image" accept="image/*" className="w-full px-4 py-2 rounded-lg border border-muted bg-muted/20" />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="ghost" onClick={() => setShowProjectModal(false)}>Cancel</Button>
                                <Button type="submit" disabled={projectSaving}>
                                    {projectSaving ? "Saving..." : (editingProject ? "Update Project" : "Create Project")}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
