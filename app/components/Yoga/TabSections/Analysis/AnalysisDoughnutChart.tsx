'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, Title, ArcElement, Legend, Tooltip } from 'chart.js'
import { LuClock8, LuTarget } from 'react-icons/lu'
import {
    IoIosCheckmarkCircleOutline,
    IoMdCloseCircleOutline,
    IoMdShareAlt,
} from 'react-icons/io'
import { SiRemark } from 'react-icons/si'
import { useSelector } from 'react-redux'

ChartJS.register(Title, ArcElement, Legend, Tooltip)

export default function AnalysisDoughnutChart() {
    const analysis = useSelector((state: any) => state.practiceSlice.analysis)

    const epochToSecond = (
        startTime: number,
        endTime: number
    ): number | null => {
        if (!startTime || !endTime) {
            return 0
        }
        return parseInt(((endTime - startTime) / 1000).toFixed(1))
    }

    function handleData(array: number[]): { zeros: number; ones: number } {
        return array.reduce(
            (counts, currentValue) => {
                if (currentValue === 0) {
                    counts.zeros++
                } else if (currentValue === 1) {
                    counts.ones++
                }
                return counts
            },
            { zeros: 0, ones: 0 }
        )
    }

    const counts = handleData(analysis.correctPose)

    const data = {
        labels: ['Correct', 'Incorrect'],
        datasets: [
            {
                label: 'You have performed',
                data: [counts.ones, counts.zeros],
                backgroundColor: ['#4158a8', '#a0b2f8'],
                hoverOffset: 4,
            },
        ],
    }

    const accuracy: number =
        analysis &&
        parseInt(
            (((counts.ones - counts.zeros) / counts.ones) * 100).toFixed(1)
        )

    const grading: { [key: number]: string } = {
        100: 'Excellent',
        90: 'Excellent',
        80: 'Very Good',
        70: 'Good',
        60: 'Fair',
        50: 'Needs Improvement',
        40: 'Poor',
        30: 'Very Poor',
        20: 'Very Poor',
        10: 'Unacceptable',
        0: 'Unacceptable',
    }

    function getGrade(accuracy: number): string {
        const keys = Object.keys(grading)
            .map((key) => parseInt(key))
            .sort((a, b) => b - a)
        for (const key of keys) {
            if (accuracy >= key) {
                return grading[key]
            }
        }
        return 'Unacceptable'
    }

    const options = {
        maintainAspectRatio: true,
        responsive: true,
    }

    return (
        <>
            <div className="relative flex flex-col xl:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="absolute xl:top-1 xl:left-0 top-3 left-3 text-2xl font-bold">
                    Session Analysis
                </div>

                <div className="flex w-full xl:w-1/2 h-[40vh] justify-center items-center">
                    <div className="flex-none max-w-full max-h-full mt-10 xl:mt-0">
                        <Doughnut data={data} />
                    </div>
                </div>

                <div className="flex xl:flex-col xl:w-1/2 w-full p-4 justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center bg-blue-100 p-4 w-full max-w-md gap-3 rounded-xl shadow-md  hover:scale-[1.01]  duration-700">
                            <LuClock8 className="text-blue-800 text-2xl font-semibold" />
                            <span className="text-xl font-medium">
                                Duration:{' '}
                                {epochToSecond(
                                    analysis?.startTime,
                                    analysis?.endTime
                                )}{' '}
                                s
                            </span>
                        </div>

                        <div className="flex items-center bg-blue-100 p-4 w-full max-w-md gap-3 rounded-xl shadow-md hover:scale-[1.01]  duration-700">
                            <LuTarget className="text-blue-800 text-2xl font-semibold" />
                            <span className="text-xl font-medium">
                                Accuracy: {accuracy >= 0 ? accuracy : 0} %
                            </span>
                        </div>

                        <div className="flex items-center bg-emerald-100 p-4 w-full max-w-md gap-3 rounded-xl shadow-md hover:scale-[1.01]  duration-700">
                            <IoIosCheckmarkCircleOutline className="text-emerald-800 text-2xl font-semibold" />
                            <span className="text-xl font-medium">
                                Correct: {counts.ones}
                            </span>
                        </div>

                        <div className="flex items-center bg-blue-100 p-4 w-full max-w-md gap-3 rounded-xl shadow-md hover:scale-[1.01]  duration-700">
                            <SiRemark className="text-blue-800 text-2xl font-semibold" />
                            <span className="text-xl font-medium">
                                Remark: {getGrade(accuracy)}
                            </span>
                        </div>

                        <div className="flex items-center bg-rose-100 p-4 w-full max-w-md gap-3 rounded-xl shadow-md ">
                            <IoMdCloseCircleOutline className="text-rose-800 text-2xl font-semibold" />
                            <span className="text-xl font-medium">
                                Incorrect: {counts.zeros}
                            </span>
                        </div>

                        <div className="flex items-center bg-blue-100 p-4 w-full max-w-md gap-3 rounded-xl shadow-md hover:scale-[1.01]  duration-700">
                            <IoMdShareAlt className="text-blue-800 text-2xl font-semibold" />
                            <span className="text-xl font-medium">
                                Share on Socials
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
