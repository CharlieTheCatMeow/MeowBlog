"use client";

import {authClient} from "@/lib/auth-client";
import type { PostType } from "@/app/post/actions";

function Post({ post }: { post: PostType }) {
    const { data: session, isPending } = authClient.useSession();
    const isAdmin = session?.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    return (
        <div className="flex flex-col gap-2 min-h-[calc(100vh-6rem)] p-4 m-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.5)] transition-all wrap-break-word">
            <h1 className="text-zinc-300 font-bold text-5xl">{post.title}</h1>
            <div className="text-zinc-400 font-extralight text-xs">{post.date.toLocaleDateString()}</div>
            <div>
                {post.content.map((paragraph, i) => (
                    <p key={i} className="text-zinc-300 text-xl">{paragraph}</p>
                ))}
            </div>
            {isAdmin && (
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )}
        </div>
    );
}

export default Post;