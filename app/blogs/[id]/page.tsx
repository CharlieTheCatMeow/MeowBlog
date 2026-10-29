import { Suspense } from "react";
import { connection } from "next/server";
import type {PostType} from "@/app/post/actions";
import PostModel from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Post from "@/components/Post";
import { notFound } from "next/navigation";

async function BlogPost({params}: { params: Promise<{ id: string }> }) {
    await connection();
    const {id} = await params;
    await dbConnect();
    const doc = await PostModel.findOne({id: id});
    if (!doc) notFound();

    const post: PostType = {
        id: doc.id,
        title: doc.title,
        date: doc.date,
        content: [...doc.content],
        likes: [...(doc.likes ?? [])],
    }

    return <Post post={post} />;
}

export default function Page({params}: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<p className="m-4 text-foreground/60">Loading post...</p>}>
            <BlogPost params={params} />
        </Suspense>
    )
}