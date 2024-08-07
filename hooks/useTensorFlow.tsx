'use client'
import * as tf from '@tensorflow/tfjs'
import { useState, useCallback } from 'react'

function useTensorFlow() {
    const [modelLoadingStatus, setModelLoadingStatus] = useState<string>('idle')
    const [model, setModel] = useState<tf.GraphModel | null>(null)

    // Function to load the TensorFlow model
    const loadModel = useCallback(async (set: number) => {
        setModelLoadingStatus('pending')
        try {
            const loadedModel = await tf.loadGraphModel(
                `https://raw.githubusercontent.com/rajyavardhanbithale/yoga-trainer/main/public/model/set${set}/model.json`
            )
            setModel(loadedModel)
            setModelLoadingStatus('success')
        } catch (error) {
            console.error('Error loading model:', error)
            setModelLoadingStatus('error')
        }
    }, [])

    // Function to run the TensorFlow model on an image
    async function runModel(options: {
        set: number
        pred_image?: string | null
    }) {
        const { set, pred_image } = options

        setModelLoadingStatus('pending')

        try {
            const model = await tf.loadGraphModel(
                `https://raw.githubusercontent.com/rajyavardhanbithale/yoga-trainer/main/public/model/set${set}/model.json`
            )

            if (model) {
                setModelLoadingStatus('success')
            }

            if (pred_image) {
                let image = new Image()
                image.crossOrigin = 'anonymous'
                image.src = pred_image

                return new Promise<string>((resolve, reject) => {
                    image.onload = () => {
                        try {
                            let tfTensor = tf.browser.fromPixels(image)
                            tfTensor = tfTensor.expandDims(0)
                            tfTensor = tfTensor.cast('float32')

                            const pred = model.predict(tfTensor) as tf.Tensor
                            tfTensor.dispose()

                            pred.data()
                                .then((val1) => {
                                    resolve(val1.toString())
                                })
                                .catch(reject)
                        } catch (error) {
                            reject(error)
                        }
                    }
                    image.onerror = reject
                })
            }
        } catch (error) {
            console.error('Error during model prediction:', error)
            setModelLoadingStatus('idle')
        }

        return null
    }

    // Function to reset model state
    const resetModel = useCallback(() => {
        setModelLoadingStatus('idle')
        setModel(null)
    }, [])

    // Function to stop and dispose of the model
    const stopModel = useCallback(() => {
        if (model) {
            model.dispose()
            setModel(null)
        }
    }, [model])

    return { runModel, stopModel, modelLoadingStatus, resetModel, loadModel }
}

export default useTensorFlow
