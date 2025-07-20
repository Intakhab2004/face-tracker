"use client";

import { useEffect, useRef } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import toast from "react-hot-toast";

export default function FaceTracker({width = 640, height = 480, canvasRef, setCameraReady}){
    const videoRef = useRef(null);

    useEffect(() => {
        let faceLandmarker = null;
        let lastVideoTime = -1;

        const initFaceMesh = async() => {
            try{
                // Loading MediaPipe Vision Tasks
                const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");

                faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                    },
                    runningMode: "VIDEO",
                    numFaces: 1,
                });

                startCamera();
            }
            catch(error){
                console.log("Failed to initialize FaceMesh:", error);
                toast.error("Something went wrong!!!");
            }
        }

        const startCamera = async() => {
            try{
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width, height },
                    audio: true
                });
                videoRef.current.srcObject = stream;
                setCameraReady(true);

                videoRef.current.onloadeddata = () => {
                    videoRef.current.play();
                    requestAnimationFrame(predict);
                };
            }
            catch(error){
                console.log("Something went wrong while accessing the camera: ", error);
                toast.error("Camera access denied!!");
                setCameraReady(false);
            }
        }

        const predict = async() => {
            if(!faceLandmarker || !videoRef.current || videoRef.current.readyState < 2){
                requestAnimationFrame(predict);
                return;
            }
            if(videoRef.current.currentTime === lastVideoTime){
                requestAnimationFrame(predict);
                return;
            }

            lastVideoTime = videoRef.current.currentTime;

            try{
                const results = await faceLandmarker.detectForVideo(
                    videoRef.current,
                    performance.now()
                );

                drawResults(results);
            }
            catch(error){
                console.log("FaceLandmarker detectForVideo error:", error);
            }
            requestAnimationFrame(predict);
        }

        const drawResults = (results) => {
            const canvasCtx = canvasRef.current.getContext("2d");
            canvasCtx.clearRect(0, 0, width, height);
            canvasCtx.drawImage(videoRef.current, 0, 0, width, height);

            if(results.faceLandmarks.length > 0){
                results.faceLandmarks.forEach((landmarks) => {
                    canvasCtx.fillStyle = "red";
                    landmarks.forEach((point) => {
                        canvasCtx.beginPath();
                        canvasCtx.arc(point.x * width, point.y * height, 2, 0, 2 * Math.PI);
                        canvasCtx.fill();
                    })
                })
            }
        }
        initFaceMesh();

        return () => {
            if(videoRef.current?.srcObject){
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }   
        }
    }, [width, height]);
    
    return (
        <div className="flex justify-center relative w-full max-w-full">
            <video
                ref={videoRef}
                className="absolute top-0 left-0"
                width={width}
                height={height}
                style={{ display: "none" }}
            />

            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="rounded-lg shadow-md w-full max-w-3xl h-auto"
            />
        </div>
    )
}