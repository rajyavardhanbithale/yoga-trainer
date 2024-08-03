'use client'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
} from 'chart.js'
import { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
)

export default function Accuracy({ performanceData }) {
    const [userSelection, setUserSelection] = useState('mixed')
    const accuracy = performanceData.accuracy

    const inaccurate = performanceData.inaccuracy

    const label = Array.from({ length: accuracy.length }, (_, i) => {
        return i + 1
    })

    const dataMixed = {
        labels: label,
        datasets: [
            {
                label: 'Accurate',
                data: accuracy,
                borderColor: '#3a61fd',
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Inaccurate',
                data: inaccurate,
                borderColor: '#7ba3fb',
                fill: false,
                tension: 0.3,
            },
        ],
    }

    const dataAccurate = {
        labels: label,
        datasets: [
            {
                label: 'Accurate',
                data: accuracy,
                borderColor: '#3a61fd',
                fill: false,
                tension: 0.3,
            },
        ],
    }

    const dataInaccurate = {
        labels: label,
        datasets: [
            {
                label: 'Inaccurate',
                data: inaccurate,
                borderColor: '#7ba3fb',
                fill: false,
                tension: 0.3,
            },
        ],
    }

    const totalDuration = accuracy.length * 10
    const delayBetweenPoints = totalDuration / accuracy.length

    const delayFunction = (ctx) => {
        if (ctx.type !== 'data' || ctx.xStarted) {
            return 0
        }
        ctx.xStarted = true
        return ctx.index * delayBetweenPoints
    }
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN,
            delay: delayFunction,
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: 'start',
            delay: delayFunction,
        },
    }

    const options = {
        animation: animation,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                display: true,
                ticks: {
                    display: true,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                display: true,
                ticks: {
                    display: true,
                },
            },
        },
        scale: {
            min: 0,
            max: 100,
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.raw} %`
                    },
                },
            },
        },

        responsive: true,
        maintainAspectRatio: false,
    }

    const percentage = useMemo(() => {
        const accuracyPercentage = (
            accuracy.reduce((a, b) => a + b, 0) / accuracy.length
        ).toFixed(1)
        const inaccuracyPercentage = 100 - accuracyPercentage

        return {
            accuracy: accuracyPercentage,
            inaccuracy: inaccuracyPercentage,
        }
    }, [inaccurate])

    return (
        <>
            <div className="flex flex-col w-full h-full m-1 sm:mx-5 p-2">
                <div className="flex flex-col xl:flex-row h-fit sm:mx-3">
                    <div className="flex h-10 gap-5 text-slate-100">
                        <button
                            onClick={() => setUserSelection('mixed')}
                            className={`cursor-pointer text-base font-medium bg-blue-800 bg-opacity-40 px-3 rounded-2xl ${userSelection === 'mixed' ? 'bg-blue-800 border-b-[3px] border-b-secondary' : 'hover-item'}`}
                        >
                            Mixed
                        </button>
                        <button
                            onClick={() => setUserSelection('accurate')}
                            className={`cursor-pointer text-base font-medium bg-blue-800 bg-opacity-40 px-3 rounded-2xl ${userSelection === 'accurate' ? 'bg-blue-800 border-b-[3px] border-b-secondary' : 'hover-item'}`}
                        >
                            Accurate
                        </button>
                        <button
                            onClick={() => setUserSelection('inaccurate')}
                            className={`cursor-pointer text-base font-medium bg-blue-800 bg-opacity-40 px-3 rounded-2xl ${userSelection === 'inaccurate' ? 'bg-blue-800 border-b-[3px] border-b-secondary' : 'hover-item'}`}
                        >
                            Inaccurate
                        </button>
                    </div>

                    <div className="inline-flex ml-4 xl:my-0 sm:my-2 py-2 text-lg text-slate-800 ">
                        {userSelection === 'accurate' && (
                            <span>
                                You have reached{' '}
                                {Math.floor(percentage.accuracy * 100) / 100} %
                                accuracy over the past {accuracy.length}{' '}
                                Exercise.
                            </span>
                        )}
                        {userSelection === 'inaccurate' && (
                            <span>
                                You have reached{' '}
                                {Math.floor(percentage.inaccuracy * 100) / 100}%
                                inaccuracy over the past {accuracy.length}{' '}
                                Exercise.
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex w-full h-full">
                    {userSelection === 'mixed' && (
                        <Line data={dataMixed} options={options} />
                    )}

                    {userSelection === 'accurate' && (
                        <Line data={dataAccurate} options={options} />
                    )}
                    {userSelection === 'inaccurate' && (
                        <Line data={dataInaccurate} options={options} />
                    )}
                </div>
            </div>
        </>
    )
}
