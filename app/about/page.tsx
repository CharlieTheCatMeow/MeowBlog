function Page() {
    return (
        <div className="max-w-3xl mx-auto p-6 m-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-4">
            <h1 className="text-foreground/90 font-bold text-5xl">
                About MeowBlog
            </h1>
            <p className="text-foreground/80 text-lg">
                Hi everyone. This is the about page. You can find things about this project here.
            </p>
            <p className="text-foreground/80 text-lg">
                I lied. You actually cannot.
            </p>
        </div>
    );
}

export default Page;