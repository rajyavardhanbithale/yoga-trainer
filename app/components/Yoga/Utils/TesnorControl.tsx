'use client'

import useTensorFlow from "@/hooks/useTensorFlow"
import Typewriter from "typewriter-effect"
import './tensorUtils.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setSuccessMessage, setUnSuccessMessage } from "@/lib/store/tensorflow/tersorflowSlice";
import { useEffect } from "react";
export default function TensorControl() {
    const { runModel, stopModel, modelLoadingStatus } = useTensorFlow()
    const dispatch = useDispatch<AppDispatch>()

    const successMessage = useSelector((state: RootState) => state.tensorflowSlice.successMessage)
    const unSuccessMessage = useSelector((state: RootState) => state.tensorflowSlice.unsuccessMessage)
    const isPoseValid = useSelector((state: RootState) => state.tensorflowSlice.isPoseValid)

    const set = 1;

    const handleLoadModel = () => {
        runModel({ set: set })
    }

    useEffect(()=>{
        if(isPoseValid === true){
            dispatch(setSuccessMessage())
        }else{
            dispatch(setUnSuccessMessage())
        }
    },[isPoseValid])


    return (
        <>

            <div className="flex flex-col justify-center items-center h-full rounded-2xl">
                <div className="w-full h-full flex flex-col gap-5 bg-slate-200 rounded-2xl justify-center items-center shadow-xl hover:shadow-lg duration-500">
                    <>
                        {modelLoadingStatus === 'idle' &&
                            <button
                                onClick={handleLoadModel}
                                className="bg-blue-900 text-slate-50 font-semibold text-2xl h-fit 
                    py-2 px-6 rounded-tl-2xl rounded-br-2xl 
                    hover:rounded-tr-2xl hover:rounded-bl-2xl duration-500
                    hover:rounded-tl-none hover:rounded-br-none
                    shadow-xl hover:shadow-blue-800/50
                    "
                            >
                                Start
                            </button>
                        }

                        {modelLoadingStatus === 'pending' &&
                            <div className="flex flex-col items-center gap-4">
                                <div className="loader "> </div>
                                <span className="text-[2.5vh] text-text font-semibold text-center p-2"> Hang on Loading Assets</span>
                            </div>
                        }

                        {modelLoadingStatus === 'success' &&
                            <button
                                // onClick={() => dispatch(setSuccessMessage())}
                                // onClick={() => dispatch(setUnSuccessMessage())}
                                className="bg-blue-900 text-slate-50 font-semibold text-2xl h-fit 
              py-2 px-6 rounded-tl-2xl rounded-br-2xl 
              hover:rounded-tr-2xl hover:rounded-bl-2xl duration-500
              hover:rounded-tl-none hover:rounded-br-none
              shadow-xl hover:shadow-blue-800/50
              "
                            >
                                Practice
                            </button>
                        }
                    </>
                    {(successMessage || unSuccessMessage) && (
                        <div className={`${unSuccessMessage ? "text-red-600" : "text-emerald-600"} text-2xl font-bold tracking-wide text-center p-2`}>
                            <Typewriter
                                options={{
                                    strings: [successMessage ?? unSuccessMessage ?? ''],
                                    autoStart: true,
                                    delay: 40,
                                    deleteSpeed: 999999
                                }}
                            />
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
