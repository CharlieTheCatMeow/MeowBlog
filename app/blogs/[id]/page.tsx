import type {PostType} from "@/app/post/actions";
import {redirect} from "next/navigation";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";

async function Page({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    await dbConnect();
    const post = (await Post.findOne({id: id})) as PostType;
    if (!post) redirect("/");

    return (
        <div className="flex flex-col gap-2 min-h-[calc(100vh-6rem)] p-4 m-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.37)] hover:shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.5)] transition-all wrap-break-word">
            <h1 className="text-zinc-300 font-bold text-5xl">{post.title}</h1>
            <div className="text-zinc-400 font-extralight text-xs">{post.date.toLocaleDateString()}</div>
            <div>
                {post.content.map((paragraph, i) => (
                    <p key={i} className="text-zinc-300 text-xl">{paragraph}</p>
                ))}
            </div>
        </div>
    );
}

export default Page;