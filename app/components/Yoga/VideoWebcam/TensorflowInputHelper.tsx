'use client'

import useConvertTensorClass from '@/hooks/useConvertTensorClass'
import useTensorFlow from '@/hooks/useTensorFlow'
import { AppDispatch, RootState } from '@/lib/store'
import { updateYogaPoseDataBase } from '@/lib/store/practice/practiceSlice'
import { updateBoolPose } from '@/lib/store/tensorflow/tensorflowSlice'
import { UserPoseAnalysis } from '@/types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function TensorflowInputHelper(props: {
    videoRef: React.RefObject<HTMLVideoElement>
}) {
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
    const repTime: number = useSelector(
        (state: RootState) => state.tensorflowSlice.repTime
    )
    const set: number = poseData?.TFData.set || 1

    const userPoseAnalysisStructure = useSelector(
        (state: RootState) => state.practiceSlice.analysis
    )
    const [userPoseAnalysis, setUserPoseAnalysis] = useState<UserPoseAnalysis>(
        userPoseAnalysisStructure
    )

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
        const check = getPredictionClass(prediction, set)
      
        if (check === poseData?.TFData.class) {
            setUserPoseAnalysis((prevState) => ({
                ...prevState,
                accuracy: [...prevState.accuracy, 1],
                correctPose: [...prevState.correctPose, 1],
            }))

            dispatch(updateBoolPose(true))
        } else {
            setUserPoseAnalysis((prevState) => ({
                ...prevState,
                accuracy: [...prevState.accuracy, 0],
                correctPose: [...prevState.correctPose, 0],
            }))
            dispatch(updateBoolPose(false))
        }
    }

    const tensorflowPredict = async () => {
        const pred = await runModel({ set: set, pred_image: capturedFrame })

        if (pred) {
            checkPrediction(pred)
        }
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined
        if (isModelAvailable && isModelRunning) {
            setUserPoseAnalysis((prevState) => ({
                ...prevState,
                startTime: Date.now(),
            }))
            intervalId = setInterval(() => {
                handleCaptureFrame()
            }, repTime * 1000)
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [isModelAvailable, isModelRunning])

    useEffect(() => {
        if (capturedFrame && isModelAvailable) {
            tensorflowPredict()
            dispatch(updateYogaPoseDataBase({method:'update',data:userPoseAnalysis}))
        }
    }, [capturedFrame, isModelAvailable])

    useEffect(() => {
        if (isModelAvailable && !isModelRunning) {
            dispatch(
                updateYogaPoseDataBase({
                    method: 'updateDB',
                    data: {
                        ...userPoseAnalysis,
                        endTime: Date.now(),
                        poseID: poseData?.id ?? 0,
                        poseName: poseData?.name ?? '',
                        repTime: repTime,
                    },
                })
            )
        }
    }, [isModelAvailable, isModelRunning])

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
