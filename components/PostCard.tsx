import { PostType } from "@/app/post/actions";
import Link from "next/link";

function PostCard({ post }: {post: PostType}) {
    const rawText = (post.content[0] ?? "")
        .replace(/[#*_~`>]/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    const preview = rawText.slice(0, 120);
    const dateText = new Date(post.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex-shrink-0">
            <Link href={`/blogs/${post.id}`} className="flex flex-col gap-2 p-4 m-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.5)] transition-all">
                <h2 className="text-zinc-300 font-bold text-2xl">{post.title}</h2>
                <p className="text-zinc-400 font-extralight text-xs">{dateText}</p>
                <p className="text-zinc-300">{preview}</p>
            </Link>
        </div>
    );
}

export default PostCard;