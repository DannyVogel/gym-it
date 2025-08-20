import Link from "next/link";
import { SignOut } from "@/components/auth/signout-button";
import { auth } from "@/lib/auth";
import { Dumbbell, LayoutDashboard } from "lucide-react";
import { SignIn } from "@/components/auth/signin-button";

export default async function Header() {
  const session = await auth();
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gym IT
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex">
              <ul className="flex items-center space-x-6">
                {session?.user && (
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {session?.user ? <SignOut /> : <SignIn />}
          </div>
        </div>
      </div>
    </header>
  );
}
