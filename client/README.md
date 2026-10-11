# Edemy - Frontend Only

This version is a frontend-only LMS based on the provided Edemy reference application.

## What was removed
- Express/backend API calls
- Axios
- Clerk authentication dependency
- Backend environment variables
- Stripe/payment flow
- Server-side course/user/progress APIs

## What works locally
- Course browsing and search
- Course details and lecture previews
- Demo sign-in/sign-out using localStorage
- Course enrollment using localStorage
- My Enrollments and progress tracking using localStorage
- Lecture completion and course ratings using localStorage
- Become Educator / Educator Dashboard
- Add Course with Quill editor and image upload stored locally
- My Courses
- Student Enrolled view
- React Router navigation

## Setup

Use Node.js 20.19+ or 22.12+ for the current Vite 8 toolchain.

```bash
npm install
npm run dev
```

The app uses no backend and does not require a `.env` file.
