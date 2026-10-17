import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import dbConnect from "./mongoose";

async function createAuth() {
    const mongooseInstance = await dbConnect();
    const client = mongooseInstance.connection.getClient();
    return betterAuth({
        database: mongodbAdapter(client.db(), { client }),
        emailAndPassword: { enabled: true },
        plugins: [nextCookies()],
    });
}

let authPromise: ReturnType<typeof createAuth> | null = null;

export function initAuth() {
    if (!authPromise) {
        authPromise = createAuth();
    }
    return authPromise;
}