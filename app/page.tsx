import DashbordLinkButton from "@/components/common/dashboardLinkButton";
import { AuthWarn } from "@/components/auth/auth-warn";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dumbbell,
  Target,
  TrendingUp,
  Users,
  Calendar,
  Activity,
} from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gym IT
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your fitness journey with intelligent workout tracking,
              personalized routines, and comprehensive exercise analytics.
            </p>

            <div className="flex flex-col items-center space-y-4">
              <DashbordLinkButton />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exercise Database */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Exercise Database
                </h3>
              </div>
              <p className="text-gray-600 mb-3">
                Access thousands of exercises with detailed instructions and
                demonstrations.
              </p>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                1000+ Exercises
              </Badge>
            </CardContent>
          </Card>

          {/* Custom Routines */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Custom Routines
                </h3>
              </div>
              <p className="text-gray-600 mb-3">
                Build personalized workout routines tailored to your fitness
                goals.
              </p>
              <Badge
                variant="secondary"
                className="bg-purple-50 text-purple-700 hover:bg-purple-100"
              >
                Unlimited Plans
              </Badge>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Progress Tracking
                </h3>
              </div>
              <p className="text-gray-600 mb-3">
                Monitor your fitness journey with detailed workout analytics.
              </p>
              <Badge
                variant="secondary"
                className="bg-green-50 text-green-700 hover:bg-green-100"
              >
                Real-time Data
              </Badge>
            </CardContent>
          </Card>

          {/* Workout Sessions */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Live Sessions
                </h3>
              </div>
              <p className="text-gray-600 mb-3">
                Execute workouts with guided sessions and real-time tracking.
              </p>
              <Badge
                variant="secondary"
                className="bg-orange-50 text-orange-700 hover:bg-orange-100"
              >
                Interactive
              </Badge>
            </CardContent>
          </Card>

          {/* Community */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Data
                </h3>
              </div>
              <p className="text-gray-600 mb-3">
                Secure, personalized experience with your workout data.
              </p>
              <Badge
                variant="secondary"
                className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              >
                Private & Secure
              </Badge>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                  <Dumbbell className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Smart Analytics
                </h3>
              </div>
              <p className="text-gray-600 mb-3">
                Get insights into your performance and optimize your workouts.
              </p>
              <Badge
                variant="secondary"
                className="bg-teal-50 text-teal-700 hover:bg-teal-100"
              >
                AI-Powered
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-sm text-gray-600 mt-1">Exercises</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600 mt-1">Muscle Groups</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">∞</div>
              <div className="text-sm text-gray-600 mt-1">Custom Routines</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Access</div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AuthWarn />
      </Suspense>
    </div>
  );
}
