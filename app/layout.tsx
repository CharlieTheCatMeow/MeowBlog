import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MeowBlog",
    description: "Blog meow I guess",
    icons: {
        icon: "/Favicon.svg",
    }
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem("theme");
                                    if (theme) document.documentElement.setAttribute("data-theme", theme);
                                } catch(e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className="min-h-full flex flex-col">
                <Nav/>
                {children}
            </body>
        </html>
    );
}
