'use client';

import * as faceapi from 'face-api.js';
import { Box, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { memberService } from '@/app/_services';
import { toast } from 'react-toastify';

export default function AttendancePage() {
  const videoRef = useRef<any>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  let faceDetected = false;

  const { mutate } = useMutation({
    mutationFn: memberService.processImage,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error('Failed to recognize');
    },
  });

  function captureImageAndSend(detection: any) {
    // Capture the image (you may need to adapt this part based on your requirements)
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    const context = canvas.getContext('2d');
    context!.drawImage(videoRef.current, 0, 0, videoRef.current.width, videoRef.current.height);
    const capturedImage = canvas.toDataURL('image/jpeg');

    // Convert base64 to Blob
    const byteCharacters = atob(capturedImage.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Create FormData and append the image
    const formData = new FormData();
    formData.append('imageRequest', blob, 'image.jpg');

    mutate(formData);
  }

  useEffect(() => {
    async function loadModels() {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);
      setIsModelLoaded(true);
    }

    loadModels();
  }, []);

  useEffect(() => {
    async function startWebcam() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {},
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error starting webcam:', error);
        }
      }
    }

    if (isModelLoaded) {
      startWebcam();
    }
  }, [isModelLoaded]);

  useEffect(() => {
    let captureTimeout: string | number | NodeJS.Timeout | undefined;
    if (!videoRef.current || !isModelLoaded) return;

    const video = videoRef.current;
    const displaySize = { width: video.offsetWidth, height: video.offsetHeight };

    const canvas = faceapi.createCanvas(video);

    faceapi.matchDimensions(canvas, displaySize);
    document.body.append(canvas);

    // const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    video.addEventListener('play', () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
        // const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvas!.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);

        if (detections.length > 0) {
          if (!faceDetected) {
            faceDetected = true;
            captureTimeout = setTimeout(() => {
              captureImageAndSend(detections[0]);
            }, 2000); // Capture image after 2 seconds of continuous face detection
          }
        } else {
          faceDetected = false;
          clearTimeout(captureTimeout);
        }
      }, 100);
    });

    return () => {
      if (captureTimeout) {
        clearTimeout(captureTimeout);
      }
    };
  }, [isModelLoaded]);

  console.log('faceDetected', faceDetected);

  return (
    <Box py={4} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      <video ref={videoRef} width='720' height='560' autoPlay muted style={{ display: 'block' }}></video>
    </Box>
  );
}
