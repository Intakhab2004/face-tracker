"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function VideoRecorder({ canvasRef, setVideos, isCameraReady }){
    const mediaRecorderRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);

    const startRecording = () => {
        if(!canvasRef.current){
            toast.error("Canvas is not ready!");
            return;
        }

        const stream = canvasRef.current.captureStream(30);
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
            if(e.data.size > 0){
                chunks.push(e.data);
            }
        }

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const videoUrl = URL.createObjectURL(blob);
            setRecordedVideoUrl(videoUrl);

            // Save to localStorage
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const videos = JSON.parse(localStorage.getItem("videos") || "[]");
                videos.push(reader.result);
                localStorage.setItem("videos", JSON.stringify(videos));
                setVideos(videos);
                toast.success("Video saved successfully!");
            };
        }

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
    }

    const stopRecording = () => {
        if(mediaRecorderRef.current){
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }

    return (
        <div className="text-center mt-4">
            {
                !isRecording ? (
                    <button 
                        onClick={startRecording}
                        disabled={!isCameraReady} 
                        className={`px-4 py-2 rounded-md mr-2 cursor-pointer ${isCameraReady ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
                    >
                        Start Recording
                    </button>
                ) : (
                        <button onClick={stopRecording}  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-200 w-full sm:w-auto">
                            Stop Recording
                        </button>
                    )
            }

            {
                recordedVideoUrl && (
                    <div className="mt-6 flex flex-col items-center">
                        <h2 className="font-bold text-lg mb-2 text-gray-800">
                            Recorded Video:
                        </h2>
                        <video
                            src={recordedVideoUrl}
                            controls
                            className="rounded-md w-full max-w-md h-auto shadow-md"
                        />

                        <a
                            href={recordedVideoUrl}
                            download="face-tracking-video.webm"
                            className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md w-full sm:w-auto text-center"
                        >
                            Download Video
                        </a>
                    </div>
                )
            }
        </div>
    );
}
