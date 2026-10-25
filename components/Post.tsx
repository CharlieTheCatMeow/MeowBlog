"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { deleteBlog, editBlog, getIsAdmin, likePost, type PostType } from "@/app/post/actions";
import ReactMarkdowm from "react-markdown";
import remarkGfm from "remark-gfm";


const buttonStyle = "text-foreground/90 font-bold text-2xl m-2 px-6 py-2 rounded-full transition-all duration-300 bg-white/5 hover:bg-black/10 hover:text-foreground hover:scale-105 active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] cursor-pointer disabled:opacity-50";

function Post({ post }: { post: PostType }) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (session) {
            getIsAdmin().then(setIsAdmin);
        }
    }, [session]);

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const likes = post.likes ?? [];
    const hasLiked = session ? likes.includes(session.user.id) : false;

    async function handleEdit() {
        const ok = await editBlog(post.id, { title, content });
        if (ok) {
            setIsEditing(false);
            router.refresh();
        } else {
            alert("Error editing blog post");
        }
    }

    function handleCancel() {
        setTitle(post.title);
        setContent(post.content);
        setIsEditing(false);
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this post?")) return;
        const ok = await deleteBlog(post.id);
        if (ok) {
            router.push("/blogs");
        } else {
            alert("Error deleting blog post");
        }
    }

    async function handleLike() {
        if (!session) {
            router.push("/signin");
            return;
        }
        await likePost(post.id);
        router.refresh();
    }

    return (
        <div className="flex flex-col gap-2 min-h-[calc(100vh-6rem)] p-4 m-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.5)] transition-all wrap-break-word">
            {isEditing ? (
                <>
                    <input
                        className="outline-none text-foreground/90 font-bold text-5xl p-2 rounded-lg bg-black/10 border border-white/20"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {content.map((paragraph, i) => (
                        <div key={i} className="flex gap-2 items-start">
                            <textarea
                                className="flex-1 outline-none text-foreground/90 text-xl p-2 rounded-lg bg-black/10 border border-white/20"
                                value={paragraph}
                                onChange={(e) => {
                                    const updatedContent = [...content];
                                    updatedContent[i] = e.target.value;
                                    setContent(updatedContent);
                                }}
                            />
                            {content.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setContent(content.filter((_, idx) => idx !== i))}
                                    className="px-3 py-2 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/40"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setContent([...content, ""])}
                        className={buttonStyle}
                    >
                        Add paragraph
                    </button>
                </>
            ) : (
                <>
                    <h1 className="text-foreground/90 font-bold text-5xl">{title}</h1>
                    <div className="text-foreground/60 font-extralight text-xs">
                        {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="prose prose-lg max-w-none [--tw-prose-body:var(--foreground)] [--tw-prose-headings:var(--foreground)] [--tw-prose-bold:var(--foreground)] [--tw-prose-links:var(--foreground)] [--tw-prose-code:var(--foreground)] [--tw-prose-quotes:var(--foreground)]">
                        <ReactMarkdowm remarkPlugins={[remarkGfm]}>
                            {content.join("\n\n")}
                        </ReactMarkdowm>
                    </div>
                </>
            )}

            <div className="flex flex-row gap-2 mt-auto self-start">
                <button
                    onClick={handleLike}
                    className={`${buttonStyle} ${hasLiked ? "text-pink-400 border-pink-400/40" : ""}`}
                >
                    ♥ {likes.length}
                </button>
                {session && isAdmin && (
                    isEditing ? (
                        <>
                            <button className={buttonStyle} onClick={handleEdit}>
                                Save
                            </button>
                            <button className={buttonStyle} onClick={handleCancel}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={buttonStyle} onClick={() => setIsEditing(true)}>
                                Edit
                            </button>
                            <button className={buttonStyle} onClick={handleDelete}>
                                Delete
                            </button>
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default Post;