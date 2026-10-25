import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import dbConnection from "@/lib/mongoose";
import Post from "@/lib/PostModel";
import type { PostType } from "@/app/post/actions";
import SearchBar from "@/components/SearchBar";
import PostCard from "@/components/PostCard";

async function FeaturedBlogs() {
    await connection();
    await dbConnection();
    
    const featuredPosts = (await Post.find()
            .sort({ date: -1 })
            .limit(3)) as PostType[];
    if (featuredPosts.length === 0) {
        return <p className="text-foreground/60 m-4">No Blogs found D:</p>
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full max-w-5xl">
            {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

function Page() {
    return (
        <div className="flex flex-col items-center text-center px-4 py-12 gap-6">
            <h1 className="text-foreground/90 font-bold text-6xl tracking-tight">MeowBlog</h1>
            <div className="w-full max-w-md flex justify-center">
                <SearchBar />
            </div>

            <section className="w-full max-w-5xl text-left mt-6">
                <div className="flex items-center justify-between mx-4 mb-2">
                    <h2 className="text-foreground/80 font-semibold text-2xl">Recent Blogs</h2>
                    <Link href={"/blogs"} className="text-sm text-foreground/60 hover:text-foreground transition">
                        View all
                    </Link>
                </div>
                <Suspense fallback={<p className="m-4 text-foreground/60">Loading posts...</p>}>
                    <FeaturedBlogs />
                </Suspense>
            </section>
        </div>
    );
}

export default Page;