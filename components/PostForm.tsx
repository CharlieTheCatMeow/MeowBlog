"use client";

import type { PostType } from "@/app/post/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function PostForm({ postBlog }: { postBlog: (post: PostType) => Promise<boolean> }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState<string[]>([""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPreview, setIsPreview] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const newPost: PostType = {
            id: crypto.randomUUID(),
            date: new Date(),
            title: title.trim(),
            content: content.map((p) => p.trim()).filter(Boolean),
        };

        const ok = await postBlog(newPost);
        if (ok) {
            router.push("/blogs/" + newPost.id);
        } else {
            alert("Blog post creation error >:(");
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="self-end text-sm text-foreground/80 hover:text-foreground px-4 py-1 m-2 rounded-full bg-white/10 border border-white/20 cursor-pointer transition"
            >
                {isPreview ? "Edit" : "Preview"}
            </button>

            {isPreview ? (
                <div className="flex flex-col gap-2 p-4 m-2 rounded-lg bg-black/10 border border-white/20 min-h-48">
                    <h1 className="text-foreground/90 font-bold text-5xl">
                        {title || "Untitled Post"}
                    </h1>
                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content.join("\n\n") || "*Nothing to preview yet...*"}
                        </ReactMarkdown>
                    </div>
                </div>
            ) : (
                <>
                    <input
                        className="outline-none text-foreground/90 placeholder-foreground/50 font-bold text-2xl flex gap-2 p-2 m-2 rounded-lg bg-black/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/20 transition-all"
                        type="text"
                        required
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {content.map((paragraph, i) => (
                        <div key={i} className="flex gap-2 items-start">
                            <textarea
                                rows={4}
                                required
                                className="flex-1 outline-none text-foreground/90 placeholder-foreground/50 font-bold text-xl p-2 m-2 rounded-lg bg-black/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/20 transition-all"
                                placeholder="Content"
                                value={paragraph}
                                onChange={(e) => {
                                    const updated = [...content];
                                    updated[i] = e.target.value;
                                    setContent(updated);
                                }}
                            />
                            {content.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setContent(content.filter((_, idx) => idx !== i))}
                                    className="px-3 py-2 mr-2 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/40 cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        className="text-foreground/90 font-bold text-2xl m-2 px-6 py-2 rounded-full transition-all duration-300 bg-white/5 hover:bg-black/10 hover:text-foreground active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] cursor-pointer"
                        type="button"
                        onClick={() => setContent([...content, ""])}
                    >
                        Add paragraph
                    </button>
                </>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className="text-foreground/90 font-bold text-2xl m-2 px-6 py-2 rounded-full transition-all duration-300 bg-white/5 hover:bg-black/10 hover:text-foreground active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] cursor-pointer disabled:opacity-50"
            >
                {isSubmitting ? "Posting..." : "Post"}
            </button>
        </form>
    );
}

export default PostForm;