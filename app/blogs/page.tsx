import {Suspense} from "react";
import {connection} from "next/server";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import type {PostType} from "@/app/post/actions";
import PostCard from "@/components/PostCard";
import styles from "./blogs.module.css";

async function PostList() {
    await connection();
    await dbConnect();
    const allPosts = (await Post.find().sort({date: -1})) as PostType[];

    return (
        <div className={styles.list}>
            {allPosts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    );
}

export default function Page() {
    return (
        <div>
            <h1>Blogs</h1>
            <Suspense fallback={<p>Loading posts...</p>}>
                <PostList/>
            </Suspense>
        </div>
    );
}
