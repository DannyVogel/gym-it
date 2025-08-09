import { auth } from "@/lib/auth"

export async function Username() {
    const session = await auth()
    if (!session?.user) return null
    return (
        <div>
            <h2 className="text-lg font-semibold"> Username: {session.user.email} </h2>
        </div>
    );
}