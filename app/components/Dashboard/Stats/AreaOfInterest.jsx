// src/PolarChart.js
'use client'
import React from 'react'
import { PolarArea } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { pose } from '@/app/api/pose/poseApiData'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export default function AreaOfInterest({ areaOfInterest }) {
    const FAreaOfInterest = areaOfInterest.slice(0, 5)
    const label = FAreaOfInterest.map((item) => pose[parseInt(item.id)])
    const count = FAreaOfInterest.map((item) => item.count)

    const data = {
        labels: label,
        datasets: [
            {
                label: 'I have performed',
                data: count,
                backgroundColor: [
                    'rgb(58, 97, 253, 0.2)',
                    'rgb(72, 64, 186, 0.3)',
                    'rgb(80, 121, 252, 0.1)',
                    'rgb(30, 48, 97, 0.6)',
                ],
                borderColor: [
                    'rgb(58, 97, 253, 1)',
                    'rgb(72, 64, 186, 1)',
                    'rgb(80, 121, 252, 1)',
                    'rgb(30, 48, 97, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const dataset = context.dataset.data
                        const label = context.label
                        const value = dataset[context.dataIndex]
                        return `I had performed ${label} : ${value} times`
                    },
                },
            },
        },
        scales: {
            r: {
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    font: {
                        size: 18,
                    },
                },
            },
        },

        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className="xl:h-11/12 xl:w-11/12 h-full w-full">
            <PolarArea data={data} options={options} />
        </div>
    )
}
