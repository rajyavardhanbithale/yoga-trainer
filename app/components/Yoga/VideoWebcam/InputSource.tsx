'use client'

import { useRef } from 'react'
import Webcam from 'react-webcam'
import dynamic from 'next/dynamic'

const TensorflowInputHelper = dynamic(() => import('./TensorflowHelper'), {
    ssr: false,
})

export default function InputSource(props: { source: string }) {
    const videoRef = useRef(null)
    const webcamRef = useRef<Webcam>(null)

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user',
    }

    return (
        <>
            {/* <video
                ref={videoRef}
                src={`test/${props?.source}`}
                className="w-full h-full object-contain rounded-xl"
                controls
            ></video> */}

            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />

            <TensorflowInputHelper
                videoRef={videoRef}
                webcamRef={webcamRef}
                source={'webcam'}
            />
        </>
    )
}
