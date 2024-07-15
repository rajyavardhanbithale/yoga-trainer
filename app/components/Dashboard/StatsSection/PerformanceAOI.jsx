'use client'
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend, Filler } from 'chart.js';
import { pose } from "@/app/api/pose/poseApiData";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Filler);

export default function PerformanceAOI({ areaOfInterest }) {

    const backgroundColor = [
        'rgb(58, 97, 253, 0.2)',
        'rgb(72, 64, 186, 0.3)',
        'rgb(80, 121, 252, 0.1)',
        'rgb(30, 48, 97, 0.6)',
    ]

    const borderColor = [
        'rgb(58, 97, 253, 1)',
        'rgb(72, 64, 186, 1)',
        'rgb(80, 121, 252, 01)',
        'rgb(30, 48, 97, 1)',
    ]

    



    const FAreaOfInterest = areaOfInterest.slice(0, 5)
    const label = FAreaOfInterest.map(item =>
        pose[parseInt(item.id)]

    )
    const accuracy = FAreaOfInterest.map(item =>{
        const sum = item.data.reduce((sum, a) => sum + a, 0)
        return Math.round(sum / item.data.length)
    })

    const inaccuracy = accuracy.map(item => 100 - item)
   
   
   

    const data = {
        labels: label,
        datasets: [
            {
                label: 'Accuracy',
                data: accuracy,
                backgroundColor: backgroundColor[0],
                borderColor: borderColor[0],
                borderWidth: 1,
                fill: true,
            },
            {
                label: 'Inaccuracy',
                data: inaccuracy,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    const options = {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <>
            <div className="xl:h-11/12 xl:w-11/12 h-full w-full">
                <Radar data={data} options={options} />
            </div>
        </>
    );
}
