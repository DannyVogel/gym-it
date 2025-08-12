import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignIn } from "@/components/auth/signin-button";
import { auth } from "@/lib/auth"

export default async function dashboardLinkButton() {
    const session = await auth();
    return (
        <>
            {
                session?.user ? <Button className="mb-4" asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button> : <SignIn />
            }
        </>
    );
}