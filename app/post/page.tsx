import {Suspense} from "react";
import {postBlog, getIsAdmin} from "./actions";
import {redirect} from "next/navigation";
import PostForm from "@/components/PostForm";
import {connection} from "next/server";

async function PostContent() {
    await connection();
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
        redirect("/");
    }
    return <PostForm postBlog={postBlog} />;
}

export default function Page() {
    return (
        <div className="flex flex-col gap-2 p-4 m-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.5)] transition-all">
            <h1 className="text-foreground/90 font-bold text-5xl m-4">Create Blog</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <PostContent/>
            </Suspense>
        </div>
    );
}