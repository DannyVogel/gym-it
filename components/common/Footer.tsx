import { Dumbbell, Github } from "lucide-react";
import Link from "next/link";

export default async function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gym IT
          </span>
        </div>
        <Link
          href="https://github.com/DannyVogel"
          target="_blank"
          className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-all duration-200 group"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200/50">
        <p className="text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} Gym IT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
