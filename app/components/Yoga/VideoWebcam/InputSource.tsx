'use client'

import { useRef } from 'react'
import TensorflowInputHelper from './TensorflowHelper'

export default function InputSource(props: { source: string; videoRef: any }) {
    const videoRef = useRef(null)

    return (
        <>
            <video
                ref={videoRef}
                src={`test/${props?.source}`}
                className="w-full h-full object-contain rounded-xl"
                controls
            ></video>

            <TensorflowInputHelper videoRef={videoRef} />
        </>
    )
}
