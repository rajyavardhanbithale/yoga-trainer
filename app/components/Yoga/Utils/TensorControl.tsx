'use client'
import useTensorFlow from '@/hooks/useTensorFlow'
import Typewriter from 'typewriter-effect'
import './tensorUtils.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { useEffect, useState } from 'react'
import TensorButton from './TensorButton'
import Preferences from './Menu/Preferences'
import CloudSaveDialog from './CloudSaveDialog'
import {
    updateModelLoaded,
    updateRepTime,
    updateModelRunning,
} from '@/lib/store/tensorflow/tensorflowSlice'

export default function TensorControl() {
    const [cloudSave, setCloudSave] = useState<boolean>(false)

    const [error, setError] = useState<string | null>(null)

    const { runModel, stopModel, modelLoadingStatus, resetModel, loadModel } = useTensorFlow()



    const dispatch = useDispatch<AppDispatch>()

    const modelSet = useSelector(
        (state: RootState) => state?.practiceSlice?.poseData?.TFData.set
    )

    const isModelRunning = useSelector(
        (state: RootState) => state.tensorflowSlice.isModelRunning
    )
    const poseMessage = useSelector(
        (state: RootState) => state.tensorflowSlice.poseMessage
    )
    const isUserPoseCorret = useSelector(
        (state: RootState) => state.tensorflowSlice.isUserPoseCorrect
    )

    const handleStart = () => {
        const getLSItem = window.localStorage.getItem('showSaveProgressDialog')
        if (getLSItem === null || getLSItem === 'true') {
            setCloudSave(true)
        } else {
            dispatch(updateModelRunning(true))
        }
    }

    const handleStop = () => {
        stopModel()
        dispatch(updateModelRunning(false))
    }

    const handleLoadModel = () => {
        if (modelSet) {
            loadModel(modelSet)
        } else {
            setError('Please select a pose to start the')
        }
    }

    const getRepTimeFromLocalStorage = () => {
        const repTime = window.localStorage.getItem('repTime')
        if (repTime) {
            return parseInt(repTime)
        }
        return 3
    }

    useEffect(() => {
        dispatch(updateRepTime(getRepTimeFromLocalStorage()))
    }, [])

    const startTensor = () => {
        dispatch(updateModelRunning(false))
    }

    useEffect(() => {
        if (modelLoadingStatus === 'success') {
            dispatch(updateModelLoaded(true))
        }
    }, [modelLoadingStatus])

    // const modelLoadingStatus = 'pending'
    // console.log('dbg logs', {
    //     modelLoadingStatus: modelLoadingStatus,
    //     modelSet: modelSet,
    //     // repTime: repTime,
    //     isModelLoaded: modelLoadingStatus,
    //     isModelRunning: isModelRunning,
    // })

    return (
        <>
            <div className="flex flex-col justify-center items-center h-full rounded-2xl">
                <div className="w-full h-full flex flex-col gap-5 bg-slate-200 rounded-2xl justify-center items-center shadow-xl hover:shadow-lg duration-500">
                    <>
                        {modelLoadingStatus === 'idle' && (
                            <TensorButton
                                label="Start"
                                onClick={handleLoadModel}
                            />
                        )}

                        {modelLoadingStatus === 'pending' && (
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-full flex bg-slate-200 justify-center">
                                    <div className="loader-tf"></div>
                                </div>
                                <span className="text-lg font-semibold text-center p-2">
                                    Hang on, loading 40 MB of assets.
                                </span>
                            </div>
                        )}

                        {modelLoadingStatus === 'success' && isModelRunning && (
                            <TensorButton label="Stop" onClick={handleStop} />
                        )}

                        {modelLoadingStatus === 'success' &&
                            !isModelRunning &&
                            !isModelRunning && (
                                <TensorButton
                                    label="Practice"
                                    onClick={handleStart}
                                />
                            )}

                        <CloudSaveDialog
                            open={cloudSave}
                            setOpen={setCloudSave}
                            startTensor={startTensor}
                        ></CloudSaveDialog>
                    </>
                    {isModelRunning && poseMessage && (
                        <div
                            className={`${isUserPoseCorret ? 'text-emerald-600' : 'text-rose-600'} text-2xl font-bold tracking-wide text-center p-2`}
                        >
                            <Typewriter
                                options={{
                                    strings: [poseMessage],
                                    autoStart: true,
                                    delay: 40,
                                    deleteSpeed: 999999,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <Preferences isProp={true} />
        </>
    )
}
