This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


# Face Tracking & Video Recording App

A **Next.js** application that performs **real-time face tracking** using **MediaPipe Face Landmarker** and allows you to **record videos with face-tracking markers**.  
Recorded videos are saved locally using **localStorage** and can be **viewed, downloaded, or deleted** within the app.


## Features

✅ Real-time **face tracking** using MediaPipe  
✅ **Video recording** with tracking markers visible  
✅ **Save videos locally** in the browser (`localStorage`)  
✅ **Video gallery** with download & delete options  
✅ Fully **responsive** – works on mobile & desktop  
✅ Modern UI using **Tailwind CSS**


## Tech Stack

**Frontend:**  
- [Next.js 14](https://nextjs.org/) (React Framework)  
- [Tailwind CSS](https://tailwindcss.com/) (Styling)  
- [React Hot Toast](https://react-hot-toast.com/) (Notifications)

**Face Tracking:**  
- [MediaPipe Face Landmarker](https://developers.google.com/mediapipe) (`@mediapipe/tasks-vision`)

**Video Recording:**  
- **MediaRecorder API** (records canvas stream)  
- **localStorage** (saves videos as Base64 URLs)

**Live Link:**  
- [Live](https://face-tracker-mu.vercel.app/)


