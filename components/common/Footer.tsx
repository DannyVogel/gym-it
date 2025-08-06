export default function Footer() {
    return (
        <footer className="flex items-center justify-center p-4 bg-gray-800 text-white">
            <p className="text-center text-sm ">
                © {new Date().getFullYear()} Gym IT. All rights reserved.
            </p>
        </footer>
    );
}