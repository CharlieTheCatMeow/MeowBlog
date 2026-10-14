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
    if (!session) {
        throw new Error("No.");
    }
    return session.user;
}

export async function postBlog(post: PostType) {
    const user = await requireUser();
    try {
        await dbConnect();
        await Post.create({ ...post, autherId: user.id });
    } catch (error) {
        console.error("Error: " + error);
    }
}

export async function editBlog(id: string, updates: Partial<Omit<PostType, "id">>) {
    try {
        await dbConnect();
        const updated = await Post.findByIdAndUpdate(
            { id },
            { $set: updates },
            { new: true }
        );
        if (!updated) {
            console.error("No post found with id " + id);
            return null
        }
        revalidatePath("/");
        return updated;
    } catch (error) {
        console.error("Error: " + error);
    }
}

export async function deleteBlog(id: string) {
    try {
        await dbConnect();
        const deleted = await Post.findByIdAndDelete({ id });
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