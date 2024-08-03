'use client'

import {
    Chart as ChartJS,
    BarElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend)

export default function WeekActivity({ weeklyActivity }) {


    
    const labels = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Daily Activity',
                data: weeklyActivity,
                backgroundColor: [
                    '#3a61fd',
                    '#5079fc',
                    '#668ffc',
                    '#7ba3fb',
                    '#668ffc',
                    '#5079fc',
                    '#3a61fd',
                ],
                borderWidth: 0,
                barThickness: 30,
                maxBarThickness: 30,
                borderRadius: 10,
                hoverBorderRadius: 15,
            },
        ],
    }

    const options = {
        animations: {
            tension: {
                duration: 10000,
                easing: 'easeInElastic',
            },
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                display: false,
                ticks: {
                    display: false,
                },
                max: Math.max(...weeklyActivity) + 2,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        responsive: true,
        maintainAspectRatio: true,
    }

    return (
        <div className="w-full">
            <Bar data={data} options={options} />
        </div>
    )
}
