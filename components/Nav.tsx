import Link from "next/link";

const linkStyles = "px-6 py-2 rounded-full text-zinc-200 text-sm transition-all duration-300 bg-white/5 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0, 0, 0, 0.37)]";

function Nav() {
    return (
        <nav className="flex items-center justify-start px-2 py-2 gap-2 bg-white/10 backdrop-blur-md border-b border-white/20">
            <Link href="/" className={linkStyles}>Home</Link>
            <Link href="/blogs" className={linkStyles}>Blogs</Link>
            <Link href="/post" className={linkStyles}>Posts</Link>
            <Link href="/about" className={linkStyles}>About</Link>
            <Link href="/signin" className={linkStyles}>Sign in</Link>
        </nav>
    );
}

export default Nav;