import { signIn } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
            }}
        >
            <Button type="submit">Sign in</Button>
        </form>
    )
}