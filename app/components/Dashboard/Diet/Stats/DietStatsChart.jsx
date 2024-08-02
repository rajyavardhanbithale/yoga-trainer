'use client'

import React, { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
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

// Register the components needed for the Line chart
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
)

export default function DietStatChart({ nutrientData }) {
    const [chartType, setChartType] = useState('mixed')

    const { fat, carb, calorie, protein, dates } = nutrientData

    const labels = dates?.map((d) => new Date(d).toLocaleDateString())

    const backgroundColor = [
        'rgb(58, 97, 253, 1)',
        'rgb(72, 64, 186, 1)',
        'rgb(80, 121, 252, 1)',
        'rgb(30, 48, 97, 1)',
    ]
    const dataMixed = {
        labels,
        datasets: [
            {
                label: 'Fat',
                data: fat,
                borderColor: backgroundColor[0],
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Carb',
                data: carb,
                borderColor: backgroundColor[1],
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Calorie',
                data: calorie,
                borderColor: backgroundColor[2],
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Protein',
                data: protein,
                borderColor: backgroundColor[3],
                fill: false,
                tension: 0.3,
            },
        ],
    }

    const dataFat = {
        labels,
        datasets: [
            {
                label: 'Fat',
                data: fat,
                borderColor: backgroundColor[0],
                fill: false,
                tension: 0.3,
            },
        ],
    }

    const dataCarb = {
        labels,
        datasets: [
            {
                label: 'Carb',
                data: carb,
                borderColor: backgroundColor[1],
                fill: false,
                tension: 0.3,
            },
        ],
    }

    const dataCalorie = {
        labels,
        datasets: [
            {
                label: 'Calorie',
                data: calorie,
                borderColor: backgroundColor[2],
                fill: false,
                tension: 0.3,
            },
        ],
    }

    const dataProtein = {
        labels,
        datasets: [
            {
                label: 'Protein',
                data: protein,
                borderColor: backgroundColor[3],
                fill: false,
                tension: 0.3,
            },
        ],
    }

    const chartData = useMemo(() => {
        switch (chartType) {
            case 'fat':
                return dataFat
            case 'carb':
                return dataCarb
            case 'calorie':
                return dataCalorie
            case 'protein':
                return dataProtein
            case 'mixed':
            default:
                return dataMixed
        }
    }, [chartType, dataFat, dataCarb, dataCalorie, dataProtein, dataMixed])

    const options = {
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
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.raw} units`
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    const availableChart = ['mixed', 'fat', 'carb', 'calorie', 'protein']

    return (
        <div className="sm:h-[30vh] h-[50vh] w-full ">
            <div className="flex flex-wrap gap-3 my-2 px-5 sm:px-0">
                {availableChart.map((chart, idx) => (
                    <button
                        key={idx}
                        className="capitalize bg-blue-900 text-slate-50 px-3 py-1 rounded-2xl hover:bg-blue-700 hover:scale-105 duration-700"
                        onClick={() => setChartType(chart)}
                    >
                        {chart}
                    </button>
                ))}
            </div>
            <Line data={chartData} options={options} className="mb-5" />
        </div>
    )
}
