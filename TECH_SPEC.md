## Gym-It Tech Spec

### Overview

- **Purpose**: Search exercises, build workout routines, and persist them per user.
- **Architecture**: Next.js App Router with server route handlers, client components for UI, Supabase for data, NextAuth for auth.

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Auth**: NextAuth v5 (Google provider); session augmented with `user.id`
- **Database**: Supabase (Postgres) via `@supabase/ssr` on the server
- **UI**: Tailwind CSS v4, shadcn-style components built on Radix UI (`components/ui/*`), `lucide-react` icons, `sonner` toasts, `next-themes` for theming
- **External API**: Exercise DB proxy `https://exercisedb-api-theta.vercel.app/api/v1` (via `lib/api.ts`)
- **Tooling**: ESLint 9, TypeScript 5

### Directory Layout (selected)

- `app/` App Router pages and API route handlers
- `components/` UI components (auth, routines, routine-creation, ui)
- `lib/` cross-cutting libs (`auth`, `db`, `api`, `utils`)
- `types/` shared TypeScript types (`excercisedb-api.ts`, `db.ts`)
- `utils/supabase/` SSR Supabase client

### Authentication

- Provider: Google OAuth
- Session augmentation in `lib/auth.ts` sets `session.user.id = Google profile.sub`
- Exposed helpers: `auth()`, `signIn()`, `signOut()`, `handlers` (bound to `/api/auth/[...nextauth]`)

### Data Model (Supabase)

- `workout_routines`:
  - `id` uuid PK, `user_id` uuid FK, `name` text, `created_at` timestamptz
- `routine_exercises`:
  - `id` uuid PK, `routine_id` uuid FK -> `workout_routines.id`
  - `exercise_api_id` text, `sets` int nullable, `reps` int nullable, `order` int

### Core Types

- From `types/excercisedb-api.ts`:
  - `Exercise`: `{ exerciseId, name, gifUrl, targetMuscles[], bodyParts[], equipments[], secondaryMuscles[], instructions[] }` + optional `target`, `bodyPart`, `equipment`
  - `ExerciseSearchResponse`: `{ success: true, metadata, data: Exercise[] }`
  - `ExerciseByIdResponse`: `{ success: boolean, data: Exercise }`
  - `SearchOptions`: `{ q, offset?, limit?, threshold? }`
- From `types/db.ts`:
  - `CreateRoutineRequest`: `{ routine_name: string, exercises: CreateRoutineExercise[] }`
  - `CreateRoutineExercise`: `{ exercise_api_id, order, sets?, reps?, exerciseName }`
  - `Routines`: `Array<{ id, name, routine_exercises: { exercise_api_id, order, sets, reps }[] }>`
  - `CreateRoutineResponse`: `{ routine_id, exercises: RoutineExercise[] }`

### API Endpoints (App Route Handlers)

- `GET /api/auth/[...nextauth]`, `POST /api/auth/[...nextauth]`

  - NextAuth handlers from `lib/auth.ts`

- `GET /api/exercises/search`

  - Query: `q` (required), `offset` (default 0), `limit` (default 10, max 50), `threshold` (default 0.3)
  - Response: `ExerciseSearchResponse`
  - Validates pagination params; returns 400 on bad input

- `GET /api/exercises/:exerciseId`

  - Response: `ExerciseByIdResponse`

- `GET /api/routines` (auth required)

  - Returns `Routines` for current user; 500 on failure

- `POST /api/routines` (auth required)
  - Body: `CreateRoutineRequest`
  - Creates routine and associated `routine_exercises`; returns `CreateRoutineResponse`
  - Rolls back routine if exercise insert fails

### Libs

- `lib/api.ts`
  - `searchExercises(options: SearchOptions) -> ExerciseSearchResponse`
  - `getExerciseById(exerciseId: string) -> ExerciseByIdResponse`
- `lib/db.ts`
  - `getRoutines() -> Routines | null` (filters by `session.user.id`, orders by `routine_exercises.order`)
  - `createRoutine(name, exercises)` inserts into `workout_routines` then `routine_exercises`
- `utils/supabase/server.ts`
  - SSR Supabase client wired to Next.js cookies

### Key UI Components (layout & behavior)

- `components/routine-creation/ExerciseSearch.tsx`

  - Search field + submit button; min 3 chars; pagination with page window/ellipses
  - Calls `/api/exercises/search`; shows counts; uses `sonner` for errors
  - Renders list of `ExerciseCard` in a scroll container

- `components/routine-creation/ExerciseCard.tsx`

  - Card layout:
    - Header: name (uppercase), metadata badges for `target`, `bodyPart`, `equipment`
    - Primary action: "Add" button (disabled if already added)
    - Details toggle: fetches `/api/exercises/:id` on first expand
    - Details content: GIF image, Radix Accordion for step instructions, badges for secondary muscles

- `components/routine-creation/RoutineBuilder.tsx`

  - Displays routine stats (exercise count, total sets)
  - List of `RoutineExerciseCard` with scroll; actions: clear sets/reps, set all 3×10; submit creates routine

- `components/routine-creation/RoutineExerciseCard.tsx`
  - Per-exercise configuration: numeric inputs for `sets`/`reps`, quick preset buttons (e.g., 3×10)
  - Visual status: configured/incomplete via left border + badges
  - Remove action; drag handle placeholder (no DnD yet)

### State Management

- Local component state with React hooks (`useState`) for search, pagination, form fields; no global store

### Styling & Theming

- Tailwind CSS utility classes; `cn()` helper merges class names
- shadcn-style components under `components/ui/*` wrapping Radix primitives
- `next-themes` integrated for theme switching (where used)

### Environment Variables

- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (NextAuth Google provider)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase SSR client)

### Error Handling

- API routes return 400 for invalid input, 500 on server errors; logs to server console
- UI shows loading states and `sonner` toasts; Exercise GIF load failures surface a friendly message

### Assumptions & Notes

- Exercise data is fetched via a public proxy API
- Auth is required for routines; unauthenticated calls to `/api/routines` return 401 on POST and null/500 on GET
