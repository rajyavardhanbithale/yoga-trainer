'use client'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default function Accuracy({ performanceData }) {
    const [userSelection, setUserSelection] = useState('mixed');
    const accuracy = performanceData.accuracy

    const inaccurate = performanceData.inaccuracy

    const label = Array.from({ length: accuracy.length }, (_, i) => {
        return i + 1
    })


    const dataMixed = {
        labels: label,
        datasets: [
            {
                label: "Accurate",
                data: accuracy,
                borderColor: "#3a61fd",
                fill: false,
                tension: 0.3
            },
            {
                label: "Inaccurate",
                data: inaccurate,
                borderColor: "#7ba3fb",
                fill: false,
                tension: 0.3
            }
        ],

    }

    const dataAccurate = {
        labels: label,
        datasets: [
            {
                label: "Accurate",
                data: accuracy,
                borderColor: "#3a61fd",
                fill: false,
                tension: 0.3
            },

        ],

    }

    const dataInaccurate = {
        labels: label,
        datasets: [
            {
                label: "Inaccurate",
                data: inaccurate,
                borderColor: "#7ba3fb",
                fill: false,
                tension: 0.3
            }

        ],

    }


    const totalDuration = accuracy.length * 10
    const delayBetweenPoints = totalDuration / accuracy.length;

    const delayFunction = (ctx) => {
        if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
    };
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN,
            delay: delayFunction
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: 'start',
            delay: delayFunction
        }
    };

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
                }
            },
            y: {

                beginAtZero: true,
                grid: {
                    display: false,
                },
                display: true,
                ticks: {
                    display: true,
                }
            }
        },
        scale: {
            min: 0,
            max: 100
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.raw} %`;
                    }
                }
            }
        },

        responsive: true,
        maintainAspectRatio: false,
    };

    const percentage = useMemo(() => {
        const accuracyPercentage = (accuracy.reduce((a, b) => a + b, 0) / accuracy.length).toFixed(1)
        const inaccuracyPercentage = 100 - accuracyPercentage

        return { accuracy: accuracyPercentage, inaccuracy: inaccuracyPercentage }
    }, [inaccurate])


    return (
        <>
            {/* <div
                        key={idx}
                        onClick={() => setUserSelection({ ...userSelection, active: item.class })}
                        className={`flex sm:flex-row flex-col items-center cursor-pointer m-2 px-1 py-1 text-xl font-semibold text-left  ${userSelection.active === item.class ? "border-b-[3px] border-b-secondary" : "hover-item"}`}>

                        <div className="flex items-center">
                            <span className="text-slate-950 mx-2">
                                {item.icon}
                            </span>
                            <span className="capitalize text-nowrap">
                                {item.name}
                            </span>
                        </div>
                    </div> */}

            <div className="flex flex-col xl:flex-row mx-10 my-2">
                <div className="flex gap-5">
                    <span
                        onClick={() => setUserSelection('mixed')}
                        className={`cursor-pointer text-xl font-medium   ${userSelection === 'mixed' ? "border-b-[3px] border-b-secondary" : "hover-item"}`}>
                        Mixed
                    </span>
                    <span
                        onClick={() => setUserSelection('accurate')}
                        className={`cursor-pointer text-xl font-medium   ${userSelection === 'accurate' ? "border-b-[3px] border-b-secondary" : "hover-item"}`}>
                        Accurate
                    </span>

                    <span
                        onClick={() => setUserSelection('inaccurate')}
                        className={`cursor-pointer text-xl font-medium   ${userSelection === 'inaccurate' ? "border-b-[3px] border-b-secondary" : "hover-item"}`}>
                        Inaccurate
                    </span>
                </div>

                <div className="xl:ml-auto xl:my-0 my-2 text-lg text-slate-800">
                    {userSelection === 'accurate' &&
                        <span>
                            You have reached {percentage.accuracy} % accuracy over the past {accuracy.length} days.
                        </span>
                    }
                    {userSelection === 'inaccurate' &&
                        <span>
                            You have reached {percentage.inaccuracy}% inaccuracy over the past {accuracy.length} days.
                        </span>
                    }
                </div>

            </div>

            <div className="h-[40vh]">

                {userSelection === 'mixed' &&
                    <Line data={dataMixed} options={options} />
                }

                {userSelection === 'accurate' &&
                    <Line data={dataAccurate} options={options} />
                }
                {userSelection === 'inaccurate' &&
                    <Line data={dataInaccurate} options={options} />
                }
            </div>
        </>
    )
};

