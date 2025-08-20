# Gym-It 🏋️‍♂️

A fitness management application built with Next.js that helps you search exercises, build personalized workout routines, and track your fitness journey.

## ✨ Features

### 🔍 Exercise Search & Discovery

- Search through a comprehensive database of exercises
- Filter by muscle groups, body parts, and equipment
- View detailed exercise information including GIF demonstrations
- Step-by-step instructions for proper form
- Secondary muscle group information

### 📋 Workout Routine Builder

- Create custom workout routines with multiple exercises
- Configure sets and reps for each exercise
- Drag-and-drop exercise ordering (coming soon)
- Quick preset configurations (e.g., 3×10 sets)
- Visual status indicators for incomplete configurations

### 💾 Personal Routine Management

- Save and manage multiple workout routines
- User-specific routine storage with authentication
- View existing routines with exercise details
- Edit and update routine configurations

### 🏃‍♂️ Workout Session Tracking

- Start workout sessions from your saved routines
- Track progress during workouts
- Complete workout sessions with progress tracking
- Session completion summaries

### 🔐 User Authentication

- Secure Google OAuth integration
- User-specific data isolation
- Persistent session management

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives with shadcn/ui styling
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Database

- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) with Google provider
- **API**: Next.js API routes with server-side rendering
- **External API**: Exercise database via proxy API

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm
- Google OAuth credentials
- Supabase account and project

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
# NextAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth Secret
NEXTAUTH_SECRET=your_nextauth_secret
```

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd gym-it
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser
