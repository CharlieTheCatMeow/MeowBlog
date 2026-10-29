"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserType {
    email: string;
    name: string;
    password: string;
    signUp: boolean;
}

function Page() {
    const [isPending, setIsPending] = useState(false);
    const [user, setUser] = useState<UserType>({
        email: "",
        name: "",
        password: "",
        signUp: false,
    });
    const router = useRouter();

    async function handleSignIn(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isPending) return;
        setIsPending(true);
        if (user.signUp) {
            await authClient.signUp.email(
                { ...user },
                {
                    onSuccess: () => router.push("/"),
                    onError: (ctx) => {
                        console.error(ctx.error.message);
                        alert(ctx.error.message);
                        setIsPending(false);
                    },
                },
            );
        } else {
            await authClient.signIn.email(
                { ...user },
                {
                    onSuccess: () => router.push("/"),
                    onError: (ctx) => {
                        console.error(ctx.error.message);
                        alert(ctx.error.message);
                        setIsPending(false);
                    },
                },
            );
        }
    }

    const input_styling = "p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] autofill:[-webkit-text-fill-color:#f4f4f5] autofill:[transition:background-color_9999s_ease-in-out_0s] outline-none transition-all";

    return (
        <form onSubmit={handleSignIn} className="flex flex-col gap-5 p-4 m-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all">
            <h1 className="text-foreground/90 font-bold text-5xl">
                {user.signUp ? "Sign Up" : "Sign In"}
            </h1>
            <input
                className={input_styling}
                type="email"
                required
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {user.signUp && (
                <input className={input_styling}
                    type="text"
                    placeholder="Name"
                    required
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                />
            )}
            <input className={input_styling}
                type="password"
                required
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <button
                type="button"
                onClick={() => setUser({ ...user, signUp: !user.signUp })}
                className="text-sm text-foreground/70 hover:text-foreground underline self-center cursor-pointer"
            >
                {user.signUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
            <button
                type="submit"
                disabled={isPending}
                className="text-foreground/90 font-bold text-2xl m-2 px-6 py-2 rounded-full transition-all duration-300 bg-white/5 hover:bg-black/10 hover:text-foreground hover:scale-101 active:scale-95 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] cursor-pointer disabled:opacity-50"
            >
                {isPending ? "Please wait..." : "Submit"}
            </button>
        </form>
    );
}

export default Page;