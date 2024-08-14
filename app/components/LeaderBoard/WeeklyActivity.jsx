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

export default function WeeklyActivity({ chartData }) {
    const chartDataSum = chartData.reduce((a, b) => a + b)

    const data = {
        labels: chartData.map((_, index) => index.toString()),
        datasets: [
            {
                label: '',
                borderColor: chartDataSum === 0 ? '#f43f5e' : '#c18f20', //#10b981
                pointStyle: false,
                data: chartData,
                tension: 0.3,
            },
        ],
    }

    const totalDuration = data.labels.length * 15
    const delayBetweenPoints = totalDuration / data.labels.length

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
        responsive: true,
        maintainAspectRatio: true,
        animation: animation,
        scales: {
            y: {
                display: false,
                min: Math.min(...chartData) - 0.1,
                max: Math.max(...chartData) + 1,
                ticks: {
                    stepSize: 1,
                },
            },
            x: {
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                enabled: true,
                mode: 'single',
            },
        },
    }

    return (
        <>
            <div className="h-16 w-16 my-auto">
                <Line data={data} options={options} />
            </div>
        </>
    )
}