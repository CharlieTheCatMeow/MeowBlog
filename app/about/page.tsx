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
                This site is built using next.js, react, tailwind CSS and typescript. (i hope I did not forget
                anything). <br/>
                It also uses betterAuth and MongoDB for some login and database stuff. <br/>
                Yeah idk that is it. <br/>
                You can post blogs, edit them, delete them and like them. <br/>
                To post blogs, sign in as test@example.com with the password password123. <br/>
                Also try changing the profile picture by clicking the profile picture in the top right corner. (Do not use anything weird or NSFW and stuff please)<br/>
            </p>
        </div>
    );
}

export default Page;