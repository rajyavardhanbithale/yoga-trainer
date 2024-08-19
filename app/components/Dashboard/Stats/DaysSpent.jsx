'use client'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, Title, ArcElement, Legend, Tooltip } from 'chart.js'

ChartJS.register(Title, ArcElement, Legend, Tooltip)

export default function DaySpent({ activeInMonth }) {

    const data = {
        labels: ['Active', 'Inactive'],
        datasets: [
            {
                label: 'Number of active days:',
                data: [activeInMonth.active, activeInMonth.inactive],
                backgroundColor: ['#4158a8', '#a0b2f8'],
                hoverOffset: 4,
            },
        ],
    }

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = ''
                        const dataIndex = context.dataIndex
                        if (dataIndex === 0) {
                            label = `Number of Active Days: : ${activeInMonth.active}`
                        } else if (dataIndex === 1) {
                            label = `Number of Inactive Days: : ${activeInMonth.inactive}`
                        }
                        return label
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <>
            <div className="xl:h-11/12 xl:w-11/12 h-full w-full">
                <Doughnut data={data} options={options} />
            </div>
        </>
    )
}
