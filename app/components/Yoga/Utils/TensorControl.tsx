'use client'

import useTensorFlow from '@/hooks/useTensorFlow'
import Typewriter from 'typewriter-effect'
import './tensorUtils.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import {
    isModelAvailable,
    updateModelRunning,
    updateRepTime,
} from '@/lib/store/tensorflow/tensorflowSlice'
import { useEffect, useState } from 'react'
import TensorButton from './TensorButton'
import { updateYogaPoseDataBase } from '@/lib/store/practice/practiceSlice'
import Preferences from './Preferences'
import CloudSaveDialog from './CloudSaveDialog'

export default function TensorControl() {
    const [showPreferences, setShowPreferences] = useState<boolean>(false)
    const [cloudSave, setCloudSave] = useState<boolean>(false)

    const { runModel, stopModel, resetModel, modelLoadingStatus } =
        useTensorFlow()
    const dispatch = useDispatch<AppDispatch>()

    const poseMessage = useSelector(
        (state: RootState) => state.tensorflowSlice.poseMessage
    )

    const isPoseValid = useSelector(
        (state: RootState) => state.tensorflowSlice.isPoseValid
    )
    const isModelRunning = useSelector(
        (state: RootState) => state.tensorflowSlice.isModelRunning
    )

    const set = useSelector(
        (state: RootState) => state.practiceSlice.poseData?.TFData.set
    )

    const handleLoadModel = () => {
        if (set !== undefined) {
            runModel({ set })
        } else {
            console.error('Set value is undefined')
        }
    }

    useEffect(() => {
        if (modelLoadingStatus === 'success') {
            dispatch(isModelAvailable(true))
        }
    }, [modelLoadingStatus])

    useEffect(() => {
        const repTime = localStorage.getItem('repTime')
        if (!repTime) {
            setShowPreferences(true)
        }
    }, [])

    useEffect(() => {
        const repTime = localStorage.getItem('repTime')
        if (repTime) {
            dispatch(updateRepTime(parseFloat(repTime)))
        } else {
            setShowPreferences(true)
        }
    }, [dispatch])

    useEffect(() => {
        resetModel()
    }, [set])

    const handlePractice = () => {
        const getLSItem = window.localStorage.getItem('showSaveProgressDialog')
        if (getLSItem === null || getLSItem === 'true') {
            setCloudSave(true)
        } else {
            startTensor()
        }
    }

    const startTensor = () => {
        console.log('start')

        dispatch(updateModelRunning(!isModelRunning))
        dispatch(
            updateYogaPoseDataBase({
                method: 'reset',
            })
        )
    }

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
                                <div className="loader "> </div>
                                <span className="text-[2.5vh] text-text font-semibold text-center p-2">
                                    {' '}
                                    Hang on Loading Assets
                                </span>
                            </div>
                        )}

                        {modelLoadingStatus === 'success' && isModelRunning && (
                            <TensorButton
                                label="Stop"
                                onClick={() =>
                                    dispatch(
                                        updateModelRunning(!isModelRunning)
                                    )
                                }
                            />
                        )}
                        {modelLoadingStatus === 'success' &&
                            !isModelRunning && (
                                <TensorButton
                                    label="Practice"
                                    onClick={handlePractice}
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
                            className={`${isPoseValid ? 'text-emerald-600' : 'text-rose-600'} text-2xl font-bold tracking-wide text-center p-2`}
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

            {showPreferences && (
                <Preferences
                    open={showPreferences}
                    setOpen={setShowPreferences}
                />
            )}
        </>
    )
}
