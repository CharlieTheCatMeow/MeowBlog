import type {PostType} from "@/app/post/actions";
import {redirect} from "next/navigation";
import PostModel from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Post from "@/components/Post";

async function Page({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    await dbConnect();
    const doc = await PostModel.findOne({id: id});
    if (!doc) redirect("/");

    const post: PostType = {
        id: doc.id,
        title: doc.title,
        date: doc.date,
        content: doc.content,
    }

    return <Post post={post} />;
}

export default Page;