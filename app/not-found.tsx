import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 m-4 max-w-xl mx-auto mt-16 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] gap-4">
            <h1 className="text-foreground/90 font-bold text-6xl">404 - Not Found</h1>
            <p className="text-foreground/90 font-semibold text-xl">Uhhh...</p>
            <p className="text-foreground/60 text-sm">
                The page or blog post you are looking for doesn&apos;t exist or was deleted.
            </p>
            <Link href="/" className="mt-2 px-6 py-2 rounded-full text-foreground/90 font-semibold bg-white/10 hover:bg-white/20 border border-white/20 transition">
                Go back to homepage!!! Shoo
            </Link>
        </div>
    )
}