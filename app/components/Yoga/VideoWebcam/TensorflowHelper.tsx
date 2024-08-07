'use client'

import useConvertTensorClass from '@/hooks/useConvertTensorClass'
import useTensorFlow from '@/hooks/useTensorFlow'
import { AppDispatch, RootState } from '@/lib/store'
import { practiceSliceUpdateDB } from '@/lib/store/practice/practiceSlice'
import { UserPoseAnalysis } from '@/types'
import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

export default function TensorflowInputHelper(props: {
    videoRef: React.RefObject<HTMLVideoElement>
}) {
    const [capturedFrame, setCapturedFrame] = useState<string | null>(null)
    const videoRef = props?.videoRef

    const { runModel } = useTensorFlow()
    const { getPredictionClass } = useConvertTensorClass(0.8)
    const dispatch = useDispatch<AppDispatch>()

    const poseData = useSelector(
        (state: RootState) => state.practiceSlice.poseData
    )
    const isModelAvailable = useSelector(
        (state: RootState) => state.tensorflowSlice.isModelLoaded
    )
    const isModelRunning = useSelector(
        (state: RootState) => state.tensorflowSlice.isModelRunning
    )
    const repTime: number = useSelector(
        (state: RootState) => state.tensorflowSlice.repTime
    )

    const userPoseAnalysisStructure = useSelector(
        (state: RootState) => state.practiceSlice.analysis
    )
    const [userPoseAnalysis, setUserPoseAnalysis] = useState<UserPoseAnalysis>(
        userPoseAnalysisStructure
    )
    const updateStatus = useSelector(
        (state: RootState) => state.practiceSlice.updateStatus
    )

    const set: number = poseData?.TFData.set || 1

    // capture frame
    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined
        if (isModelAvailable && isModelRunning) {
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

    // prediction
    useEffect(() => {
        // init user pose analysis
        if (
            userPoseAnalysis.poseID === 0 &&
            isModelAvailable &&
            isModelRunning
        ) {
            manipulateUserPose(userPoseAnalysis, 'init')
        }
        // update start time
        if (
            userPoseAnalysis.startTime === 0 &&
            isModelAvailable &&
            isModelRunning
        ) {
            manipulateUserPose(userPoseAnalysis, 'update-time-start')
        }

        // update end time
        if (!isModelRunning && isModelAvailable && capturedFrame) {
            manipulateUserPose(userPoseAnalysis, 'update-time-end')
        }

        if (capturedFrame && isModelAvailable && isModelRunning) {
            tensorflowPredict()
        }
    }, [capturedFrame, isModelAvailable, isModelRunning])

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

    const tensorflowPredict = async () => {
        const pred = await runModel({ set: set, pred_image: capturedFrame })
        if (pred) {
            checkPrediction(pred)
        }
    }

    const checkPrediction = (prediction: string) => {
        const check = getPredictionClass(prediction, set)

        console.log('check', check)

        if (check === poseData?.TFData.class) {
            manipulateUserPose(userPoseAnalysis, 'update-correct-pose')
        } else {
            manipulateUserPose(userPoseAnalysis, 'update-incorrect-pose')
        }
    }

    const manipulateUserPose = (pose: UserPoseAnalysis, operation: string) => {
        const randRange = (min: number, max: number): number => {
            return (
                Math.floor(
                    Math.random() * ((max - min) * 100 + 1) + min * 100
                ) / 100
            )
        }

        switch (operation) {
            case 'init':
                setUserPoseAnalysis((prev) => ({
                    ...prev,
                    poseID: poseData?.id ?? 0,
                    poseName: poseData?.name || '',
                    repTime: repTime,
                }))
                break

            case 'update-time-start':
                setUserPoseAnalysis((prev) => ({
                    ...prev,
                    startTime: Date.now(),
                }))
                break

            case 'update-time-end':
                setUserPoseAnalysis((prev) => ({
                    ...prev,
                    endTime: Date.now(),
                }))
                break

            case 'update-correct-pose':
                setUserPoseAnalysis((prev) => ({
                    ...prev,
                    correctPose: [...prev.correctPose, 1],
                    accuracy: [...prev.accuracy, randRange(0.91005, 1)],
                }))
                break

            case 'update-incorrect-pose':
                setUserPoseAnalysis((prev) => ({
                    ...prev,
                    correctPose: [...prev.correctPose, 0],
                    accuracy: [...prev.accuracy, randRange(0.30105, 1)],
                }))
                break

            case 'reset':
                setUserPoseAnalysis({
                    poseID: 0,
                    poseName: '',
                    repTime: 0,
                    startTime: 0,
                    endTime: 0,
                    correctPose: [],
                    accuracy: [],
                })
                break

            default:
                break
        }
    }

    useEffect(() => {
        if (userPoseAnalysis.correctPose.length !== 0 && isModelRunning) {
            dispatch(
                practiceSliceUpdateDB({
                    method: 'update',
                    data: userPoseAnalysis,
                })
            )
        }
        if (!isModelRunning && userPoseAnalysis.poseID !== 0) {
            dispatch(
                practiceSliceUpdateDB({
                    method: 'update-db',
                    data: userPoseAnalysis,
                })
            )
            manipulateUserPose(userPoseAnalysis, 'reset')
        }
    }, [userPoseAnalysis])

    const loadingToastRef = useRef<string | null>(null)
    useEffect(() => {
        if (!isModelRunning) {
            if (updateStatus === 'success') {
                if (loadingToastRef.current !== null) {
                    toast.dismiss(loadingToastRef.current)
                    loadingToastRef.current = null
                }
                toast.success('Synced to cloud')
            } else if (updateStatus === 'pending') {
                loadingToastRef.current = toast.loading('Syncing to cloud')
            }
        }
    }, [updateStatus, isModelRunning])

    return (
        <>
            {/* always hidden */}

            <Toaster position="top-center" reverseOrder={false} />

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
