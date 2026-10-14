import { PostType } from "@/app/post/actions";
import Link from "next/link";
import styles from "./PostCard.module.css";

function PostCard({ post }: {post: PostType}) {
    const preview = post.content[0]?.slice(0, 120) ?? "";
    const dateText = new Date(post.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Link href={`/blogs/${post.id}`} className={styles.card}>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.date}>{dateText}</p>
            <p className={styles.preview}>{preview}</p>
        </Link>
    );
}

export default PostCard;