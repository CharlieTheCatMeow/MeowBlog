"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {deleteBlog, editBlog, likePost, type PostType} from "@/app/post/actions";

const buttonStyle = "text-zinc-900 font-bold text-2xl m-2 px-6 py-2 rounded-full transition-all duration-300 bg-white/5 hover:bg-black/10 hover:text-white hover:scale-105 active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] cursor-pointer";

function Post({ post }: { post: PostType }) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const isAdmin = session?.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

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

    async function handleDelete() {
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
                        className="outline-none text-zinc-300 font-bold text-5xl p-2 rounded-lg bg-black/10 border border-white/20"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {content.map((paragraph, i) => (
                        <textarea
                            key={i}
                            className="outline-none text-zinc-300 text-xl p-2 rounded-lg bg-black/10 border border-white/20"
                            value={paragraph}
                            onChange={(e) => {
                                const updatedContent = [...content];
                                updatedContent[i] = e.target.value;
                                setContent(updatedContent);
                            }}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h1 className="text-zinc-300 font-bold text-5xl">{title}</h1>
                    <div className="text-zinc-400 font-extralight text-xs">
                        {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div>
                        {content.map((paragraph, i) => (
                            <p key={i} className="text-zinc-300 text-xl">{paragraph}</p>
                        ))}
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
                {isAdmin && (
                    isEditing ? (
                        <>
                            <button className={buttonStyle} onClick={handleEdit}>
                                Save
                            </button>
                            <button className={buttonStyle} onClick={() => setIsEditing(false)}>
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