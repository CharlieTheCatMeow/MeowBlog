import {Suspense} from "react";
import {connection} from "next/server";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import type {PostType} from "@/app/post/actions";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";


function escapeRegex(text: string) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function PostList({
                            searchParams,
                        }: {
                            searchParams: Promise<{ q?: string | string[] }>;
                        }) {
    const { q } = await searchParams;
    const query = typeof q === "string" ? q.trim(): "";
    await dbConnect();

    const filter = query
        ? {
            $or: [
                { title: { $regex: escapeRegex(query), $options: "i" } },
                { content: { $elemMatch: { $regex: escapeRegex(query), $options: "i" } } },
            ],
        }
        : {};

    const shownPosts = (await Post.find(filter).sort({ date: -1 })) as PostType[];
    return (
        <div>
            <SearchBar defaultValue={query} />
            {shownPosts.length === 0 ? (
                <p className="text-foreground/60 m-4">
                    No blogs found{query ? ` matching "${query}"` : ""}.
                </p>
            ) : (
                shownPosts.map((post) => <PostCard key={post.id} post={post} />)
            )}
        </div>
    );
}
export default function Page({ searchParams }: PageProps<"/blogs">) {
    return (
        <div>
            <h1 className="text-foreground/90 font-bold text-5xl m-4">Blogs</h1>
            <Suspense fallback={<p className="m-4 text-foreground/60">Loading posts...</p>}>
                <PostList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

