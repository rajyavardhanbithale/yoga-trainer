'use client'
import Chart from 'chart.js/auto';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import { YogaPosePerformanceData } from "@/types";
import { useSelector } from "react-redux";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default function LineChart() {

    const analysis = useSelector((state: any) => state.practiceSlice.analysis)


    const epochToSecond = (startTime: number, endTime: number): (number | null) => {
        if (!startTime || !endTime) {
            return 0;
        }
        return (endTime - startTime) / 1000;;
    }


    const handleData = () => {
        console.log();
        const accuracyLength: number = analysis?.accuracy?.length
        const timeData: (number | null) = epochToSecond(analysis?.startTime, analysis?.endTime)

        if (timeData !== null && accuracyLength) {
            const timePerRep: number = timeData / accuracyLength
            const resultData: Array<string> = Array.from({ length: accuracyLength }, (_, i) => `${Math.floor(timePerRep * (i + 1))} s`);
            const span: string = resultData[resultData.length - 1];

            return { resultData, span };

        }
        return { resultData: ['0', '0'], lastElement: 'error' };

    }

    const { resultData, span } = handleData();

    const data = {
        labels: resultData,
        datasets: [
            {
                label: 'Accuracy ' + span,
                borderColor: '#4158a8',
                data: analysis && analysis?.accuracy,
                tension: 0.2
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };




    return (
        <>
            <div className="h-[30vh] w-full">
                <Line data={data} options={options} />
            </div>
        </>
    )
}