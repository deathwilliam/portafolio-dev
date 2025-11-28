"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ExternalLink, LayoutDashboard, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getContactMessages, deleteContactMessage } from "@/lib/supabase";

export default function AdminDashboard() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await getContactMessages();
            setMessages(data || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
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

    return (
        <div className="min-h-screen bg-muted/30 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <Button onClick={() => window.open("http://localhost:3333", "_blank")} variant="outline">
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
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                                <LayoutDashboard className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/60">Projects</p>
                                <h3 className="text-2xl font-bold">Manage in Sanity</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-muted">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/60">Blog Posts</p>
                                <h3 className="text-2xl font-bold">Manage in Sanity</h3>
                            </div>
                        </div>
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
    );
}
