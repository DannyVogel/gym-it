import Link from "next/link";

export default function Header() {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">Gym IT</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <a href="/dashboard" className="hover:underline">Dashboard</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}