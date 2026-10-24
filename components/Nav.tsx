"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import fileToProfilePictureDataUrl from "@/lib/profile_picture";
import { useRouter } from "next/navigation";
import {useEffect, useRef} from "react";

const linkStyles = "px-6 py-2 rounded-full text-zinc-200 text-sm transition-all duration-300 bg-white/5 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]";

function Nav() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const isAdmin = session?.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleProfilePictureChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const dataUrl = await fileToProfilePictureDataUrl(file);
        await authClient.updateUser({ image: dataUrl });
    }

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/")
            }
        });
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    async function handleChangeTheme() {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    return (
        <nav className="flex items-center justify-start px-2 py-2 gap-2 bg-white/10 backdrop-blur-md border-b border-white/20">
            <Link href="/" className={linkStyles}>Home</Link>
            <Link href="/blogs" className={linkStyles}>Blogs</Link>
            {isAdmin && (
                <Link href="/post" className={linkStyles}>Post</Link>
            )}
            <Link href="/about" className={linkStyles}>About</Link>
            <button
                type="button"
                onClick={() => handleChangeTheme()}
                title="Click to change theme"
                className={`${linkStyles} ml-auto cursor-pointer`}
            >Theme</button>

            {!isPending && (
                session ? (
                    <div className="ml-auto flex items-center gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureChange}
                        />
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                title="Click to upload profile picture"
                                className="size-8 rounded-full overflow-hidden bg-white/10 border border-white/20 cursor-pointer flex items-center justify-center hover:ring-2 hover:ring-white/40 transition"
                            >
                                {session.user.image ? (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name}
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs font-bold text-zinc-200">
                                        {session.user.name?.charAt(0).toUpperCase() || "?"}
                                    </span>
                                )}
                            </button>
                            <span className="text-sm text-zinc-200 pr-2">
                                {session.user.name}
                            </span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className={`${linkStyles} cursor-pointer`}
                        >
                            Sign out
                        </button>
                    </div>
                ) : (
                    <Link href="/signin" className={`${linkStyles} ml-auto`}>Sign in</Link>
                )
            )}
        </nav>
    );
}

export default Nav;