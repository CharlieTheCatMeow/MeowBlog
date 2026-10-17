"use client";

import type {PostType} from "@/app/post/actions";
import {useState} from "react";
import {redirect, useRouter} from "next/navigation";

function PostForm({ postBlog }: { postBlog: (post: PostType) => Promise<void> }) {
    const router = useRouter();
    const [newPost, setNewPost] = useState<PostType>({
        id: crypto.randomUUID(),
        date: new Date(),
        title: "",
        content: [""],
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await postBlog(newPost);
            router.push("/blogs/" + newPost.id);
        } catch (error) {
            console.error(error);
            alert("Error creating blog post");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input className="outline-none text-zinc-300 text-bold text-2xl flex gap-2 p-2 m-2 rounded-lg bg-black/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.5)] hover:text-zinc-900 transition-all"
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            />
            {newPost.content.map((paragraph, i) => (
                <textarea className="outline-none text-zinc-300 text-bold text-xl flex gap-2 p-2 m-2 rounded-lg bg-black/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.5)] hover:text-zinc-900 transition-all"
                    key={i}
                    placeholder="Content"
                    value={paragraph}
                    onChange={(e) => {
                        const content = [...newPost.content];
                        content[i] = e.target.value;
                        setNewPost({...newPost, content: content});
                    }}
                ></textarea>
            ))}
            <button className="text-zinc-900 text-bold text-2xl m-2 px-6 py-2 rounded-full transition-all duration-300 bg-white/5 hover:bg-black/10 hover:text-white hover:scale-101 active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                type="button"
                onClick={() =>
                    setNewPost({...newPost, content: [...newPost.content, ""]})
                }
            >
                Add paragraph
            </button>
            <button type="submit" className="text-zinc-900 text-bold text-2xl m-2 px-6 py-2 rounded-full transition-all duration-300 bg-white/5 hover:bg-black/10 hover:text-white hover:scale-101 active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                Post
            </button>
        </form>
    );
}

export default PostForm;