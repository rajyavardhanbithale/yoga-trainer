'use client'

import useConvertTensorClass from '@/hooks/useConvertTensorClass'
import useTensorFlow from '@/hooks/useTensorFlow'
import { AppDispatch, RootState } from '@/lib/store'
import { updateBoolPose } from '@/lib/store/tensorflow/tersorflowSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function TensorflowInputHelper(props: { videoRef: React.RefObject<HTMLVideoElement> }) {
    const [capturedFrame, setCapturedFrame] = useState<string | null>(null)

    const { runModel } = useTensorFlow()
    const { getPredictionClass } = useConvertTensorClass(0.8)

    const poseData = useSelector(
        (state: RootState) => state.practiceSlice.poseData
    )
    const isModelAvailable = useSelector(
        (state: RootState) => state.tensorflowSlice.isModelAvailable
    )
    const isModelRunning = useSelector(
        (state: RootState) => state.tensorflowSlice.isModelRunning
    )
    const dispatch = useDispatch<AppDispatch>()
    const videoRef = props?.videoRef
    const repTime = 3

    const handleCaptureFrame = () => {
        const video = videoRef.current
        if (video) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            canvas.width = 250
            canvas.height = 250
            ctx?.drawImage(video, 0, 0, 250, 250)
            const imageData = canvas.toDataURL()

            setCapturedFrame(imageData)
        }
    }

    const checkPrediction = (prediction: string) => {
        const check = getPredictionClass(prediction, 1)

        if (check === poseData?.TFData.class) {
            dispatch(updateBoolPose(true))
        } else {
            dispatch(updateBoolPose(false))
        }
    }

    const tensorflowPredict = async () => {
        const pred = await runModel({ set: 1, pred_image: capturedFrame })
        console.log('Prediction result:', pred);
        if (pred) {
            checkPrediction(pred)
        }
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined

        if (isModelAvailable && isModelRunning) {
            intervalId = setInterval(() => {
                console.log('Capturing frame');
                handleCaptureFrame()
            }, repTime * 1000)
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [isModelAvailable, isModelRunning, videoRef])

    useEffect(() => {
        if (capturedFrame && isModelAvailable) {
            tensorflowPredict()
        }
    }, [capturedFrame, isModelAvailable])


    return (
        <>
            {/* always hidden */}
            {capturedFrame && (
                <div>
                    <img
                        src={capturedFrame}
                        alt="Captured Frame"
                        className="hidden"
                        height={500}
                        width={500}
                    />
                </div>
            )}
        </>
    )
}
