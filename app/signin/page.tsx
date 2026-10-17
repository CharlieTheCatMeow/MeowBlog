"use client";

import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface UserType {
    email: string;
    name: string;
    password: string;
    signUp: boolean;
}

function Page() {
    const [user, setUser] = useState<UserType>({
        email: "",
        name: "",
        password: "",
        signUp: false,
    });
    const router = useRouter();

    async function handleSignIn(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (user.signUp) {
            await authClient.signUp.email(
                {...user},
                {
                    onSuccess: () => router.push("/"),
                    onError: (ctx) =>  {
                        console.error(ctx.error.message);
                        alert(ctx.error.message);
                    }
                },
            );
        } else {
            await authClient.signIn.email(
                {...user},
                {onSuccess: () => router.push("/")},
            );
        }
    }

    const input_styling = "p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] autofill:[-webkit-text-fill-color:#f4f4f5] autofill:[transition:background-color_9999s_ease-in-out_0s] outline-none transition-all";

    return (
        <form onSubmit={handleSignIn} className="flex flex-col gap-5 p-4 m-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all">
            <h1 className="text-zinc-300 font-bold text-5xl">Sign In</h1>
            <input className={input_styling}
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            {user.signUp && (
                <input className={input_styling}
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                />
            )}
            <input className={input_styling}
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <label className="flex items-center gap-3 text-zinc-300 cursor-pointer select-none">
                <input className="relative size-6 shrink-0 cursor-pointer appearance-none rounded-md border-white/30 bg-white/10 backdrop-blur-md transition checked:border-white/60 checked:bg-[#43a2ae] checked:shadow-[0_0_12px_rgba(34,197,94,0.6)] focus-visible:ring-2 focus-visible:ring-white/60 before:absolute before:inset-0 before:grid before:place-content-center before:text-white before:opacity-0 checked:before:opacity-100"
                    type="checkbox"
                    checked={user.signUp}
                    onChange={(e) => setUser({...user, signUp: e.target.checked})}
                />
                Sign up
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Page;