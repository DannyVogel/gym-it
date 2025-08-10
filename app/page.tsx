import DashbordLinkButton from "@/components/common/dashboardLinkButton"
import { AuthWarn } from "@/components/auth/auth-warn";
import { Username } from '@/components/auth/username';

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Gym IT</h1>
      <p className="text-lg mb-8">Your personal fitness management system.</p>
      <Username />
      <DashbordLinkButton />
      <AuthWarn />
    </div>
  );
}
