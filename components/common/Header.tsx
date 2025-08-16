import Link from "next/link";
import { SignOut } from "@/components/auth/signout-button";
import { auth } from "@/lib/auth";

export default async function Header() {
  const session = await auth();
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-bold">
        Gym IT
      </Link>
      {session?.user ? (
        <div className="flex items-center space-x-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/dashboard" className="hover:underline">
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>
          <SignOut />
        </div>
      ) : null}
    </div>
  );
}
