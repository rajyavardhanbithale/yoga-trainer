'use client'

import useConvertTensorClass from "@/hooks/useConvertTensorClass";
import useTensorFlow from "@/hooks/useTensorFlow";
import { AppDispatch, RootState } from "@/lib/store";
import { updateBoolPose } from "@/lib/store/tensorflow/tersorflowSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TensorflowInputHelper(props: { videoRef: any }) {
    const [capturedFrame, setCapturedFrame] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<string>('')

    const { runModel, stopModel, modelLoadingStatus } = useTensorFlow()
    const { getPredictionClass } = useConvertTensorClass(0.80)

    const poseData = useSelector((state: RootState) => state.practiceSlice.poseData)
    const dispatch = useDispatch<AppDispatch>()
    const set = 1
    const videoRef = props?.videoRef

    const handleCaptureFrame = () => {
        const video: (any | null) = videoRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 250;
        canvas.height = 250
        ctx?.drawImage(video, 0, 0, 250, 250);
        const imageData = canvas.toDataURL();

        setCapturedFrame(imageData);
    }

    const checkPrediction = () => {
        const check = getPredictionClass(prediction, set)

        if(check === poseData?.TFData.class){
            dispatch(updateBoolPose(true))
        }else{
            dispatch(updateBoolPose(false))
        }
    }

    const tensorflowPredict = async () => {
        const pred = await runModel({ set: 1, pred_image: capturedFrame })
        setPrediction(pred ? pred : '')
    }

    useEffect(() => {
        tensorflowPredict()
    }, [capturedFrame])

    useEffect(() => {
        checkPrediction()
    }, [prediction])

    return (
        <>
            <button onClick={handleCaptureFrame}>
                cap
            </button>

            {/* always hidden */}
            {capturedFrame &&
                <div>
                    <img src={capturedFrame} alt="cap frm" className="hidden" height={500} width={500} />
                </div>
            }
        </>
    )
}