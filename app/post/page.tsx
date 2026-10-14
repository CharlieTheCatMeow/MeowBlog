import { Suspense } from "react";
import { postBlog } from "./actions";
import { initAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PostForm from "@/components/PostForm";
import { connection } from "next/server";

async function PostContent() {
    await connection();
    const auth = await initAuth();
    const session = await auth.api.getSession({headers: await headers()});
    if (!session) {
        redirect("/");
    }
    return <PostForm postBlog={postBlog} />;
}

export default function Page() {
  return (
    <div>
      <h1>Create Blog</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <PostContent />
      </Suspense>
    </div>
  );
}