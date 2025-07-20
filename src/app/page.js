"use client";

import { useRef, useState, useEffect } from "react";
import FaceTracker from "@/components/FaceTracker";
import VideoRecorder from "@/components/VideoRecorder";
import VideoGallery from "@/components/VideoGallery";

export default function Home() {
  const canvasRef = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem("videos") || "[]");
    setVideos(storedVideos);
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(11deg,rgba(2,0,36,1)_0%,rgba(41,41,120,1)_45%,rgba(0,212,255,1)_100%)] flex flex-col items-center p-6">
      <h1 className="text-2xl md:text-4xl font-bold text-black/80 drop-shadow-md mb-8 text-center">
        Face Tracking & Recording App
      </h1>

      <div className="bg-[linear-gradient(229deg,rgba(204,173,187,1)_0%,rgba(148,187,233,1)_100%)] p-4 md:p-6 rounded-xl shadow-lg w-full max-w-lg md:max-w-2xl">
        <FaceTracker width={640} height={480} canvasRef={canvasRef} />
        <VideoRecorder canvasRef={canvasRef} setVideos={setVideos} />
      </div>

      <div className="bg-[linear-gradient(229deg,rgba(204,173,187,1)_0%,rgba(148,187,233,1)_100%)] mt-6 p-4 md:p-6 rounded-xl shadow-lg w-full max-w-lg md:max-w-4xl">
        <VideoGallery videos={videos} setVideos={setVideos} />
      </div>
    </div>
  );
}

