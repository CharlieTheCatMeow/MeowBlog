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
        <div>
            <h1 className="text-zinc-300 font-bold text-5xl m-4">{post.title}</h1>
            <div>{post.date.toLocaleDateString()}</div>
            <div>
                {post.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
}

export default Page;