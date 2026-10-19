"use server";

import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { initAuth } from "@/lib/auth";
import { headers } from "next/headers"

export interface PostType {
    id: string;
    date: Date;
    title: string;
    content: string[];
}

async function requireUser() {
    const auth = await initAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        throw new Error("No.");
    }
    return session.user;
}

export async function postBlog(post: PostType) {
    const user = await requireUser();
    try {
        await dbConnect();
        await Post.create({ ...post, authorId: user.id });
    } catch (error) {
        console.error("Error: " + error);
    }
}

export async function editBlog(id: string, updates: Partial<Omit<PostType, "id">>) {
    await requireUser();
    try {
        await dbConnect();
        const updated = await Post.findOneAndUpdate(
            { id },
            { $set: updates },
            { new: true }
        );
        if (!updated) {
            console.error("No post found with id " + id);
            return false;
        }
        revalidatePath("/blogs");
        revalidatePath(`/blogs/${id}`);
        return true;
    } catch (error) {
        console.error("Error: " + error);
        return false;
    }
}

export async function deleteBlog(id: string) {
    await requireUser();
    try {
        await dbConnect();
        const deleted = await Post.findOneAndDelete({ id });
        if(!deleted) {
            console.error("No post found with id " + id);
            return false;
        }
        revalidatePath("/");
        return true;
    } catch (error) {
        console.error("Error: " + error);
    }
}