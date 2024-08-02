'use client'
import * as tf from '@tensorflow/tfjs'
import { useState } from 'react'

function useTensorFlow() {
    const [modelLoadingStatus, setModelLoadingStatus] = useState<string>('idle')
    const [model, setModel] = useState<any>()

    async function runModel(options: { set: number; pred_image?: any }) {
        const { set, pred_image } = options

        setModelLoadingStatus('pending')

        // const model = await tf.loadGraphModel(`model/set${set}/model.json`)
        const model = await tf.loadGraphModel(`https://raw.githubusercontent.com/rajyavardhanbithale/yoga-trainer/main/public/model/set${set}/model.json`)


        if (model) {
            setModelLoadingStatus('success')
        }

        if (pred_image) {
            let image = new Image(250, 250)
            image.crossOrigin = 'anonymous'

            image.src = pred_image

            let tfTensor = tf.browser.fromPixels(image)
            tfTensor = tfTensor.expandDims(0)
            tfTensor = tfTensor.cast('float32')

            const pred = model.predict(tfTensor) as tf.Tensor
            const val1 = pred.dataSync()

            return val1.toString()
        }
    }

    function resetModel() {
        setModelLoadingStatus('idle')
    }

    // To be implemented
    function stopModel() {
        if (model) {
            model.dispose()
        }
    }
    return { runModel, stopModel, modelLoadingStatus, resetModel }
}

export default useTensorFlow
