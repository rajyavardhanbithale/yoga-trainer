'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, Title, ArcElement, Legend, Tooltip } from 'chart.js'

// Register the necessary components
ChartJS.register(Title, ArcElement, Legend, Tooltip)

const MarcoNutDoughnut = ({ nutritionalData }) => {
    const { sumFat, sumCarb, sumCalorie, sumProtein } = nutritionalData

    const data = {
        labels: ['Fat', 'Carbs', 'Calories', 'Protein'],
        datasets: [
            {
                label: 'Nutritional Values',
                data: [sumFat, sumCarb, sumCalorie, sumProtein],
                backgroundColor: [
                    'rgb(58, 97, 253, 1)',
                    'rgb(72, 64, 186, 2)',
                    'rgb(80, 121, 252, 1)',
                    'rgb(30, 48, 97, 1)',
                ],
                hoverOffset: 4,
            },
        ],
    }

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const labels = ['Fat', 'Carbs', 'Calories', 'Protein']
                        const values = [sumFat, sumCarb, sumCalorie, sumProtein]

                        return `${labels[context.dataIndex]}: ${values[context.dataIndex]}`
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    const checkCondition = sumFat + sumCarb + sumCalorie + sumProtein === 0
    return (
        <>
            {!checkCondition && (
                <div className="h-[30vh] w-full mt-12">
                    <Doughnut data={data} options={options} />
                </div>
            )}
            {checkCondition && (
                <div className="text-2xl w-3/4 mt-12 text-center bg-slate-100 p-8 rounded-2xl shadow-md">
                    No data available to display the chart
                </div>
            )}
        </>
    )
}

export default MarcoNutDoughnut
