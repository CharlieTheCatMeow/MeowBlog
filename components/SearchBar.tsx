import Form from "next/form";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
    return (
        <Form action="/blogs" className="flex gap-2 m-4">
            <input
                type="search"
                name="q"
                defaultValue={defaultValue}
                placeholder="Search blogs..."
                className="outline-none w-full max-w-md px-4 py-2 rounded-lg bg-white/10 text-zinc-200 placeholder-zinc-400 border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <button
                type="submit"
                className="px-6 py-2 rounded-lg text-zinc-200 bg-white/10 hover:bg-white/20 border border-white/20 transition cursor-pointer"
            >
                Search
            </button>
        </Form>
    );
}
