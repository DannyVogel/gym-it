import { auth } from "@/lib/auth"

export async function Username() {
    const session = await auth()
    if (!session?.user) return null
    const username = session.user.name || session.user.email || "Guest";
    return (
        <div className="my-4 p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold"> User: {username} </h2>
        </div>
    );
}