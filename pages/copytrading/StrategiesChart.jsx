import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend
);

const ChartComponent = ({ chartData, color, bgcolor, bgbotcolor }) => {
    const isValidChartData = Array.isArray(chartData);

    let suggestedMin = 0; // Default value

    // Find the minimum extremum value in the chartData
    if (isValidChartData) {
        const minExtremum = Math.min(...chartData);
        if (minExtremum >= 0) {
            suggestedMin = 0;
        } else {
            suggestedMin = minExtremum;
        }
    }

    const data = {
        labels: isValidChartData ? Array.from({ length: chartData.length }, (_, i) => i + 1) : [],
        datasets: [
            {
                label: 'Profit over 60 days',
                data: isValidChartData ? chartData : [],
                fill: true,
                backgroundColor: 'rgb(255, 255, 255)', // White color with transparency
                borderColor: color,
                pointRadius: 0,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                suggestedMin: suggestedMin,
                ticks: {
                    callback: function (value, index, values) {
                        return value.toFixed(2);
                    },
                },
            },
        },
        elements: {
            line: {
                tension: 0,
            },
        },
    };

    if (!isValidChartData) {
        return <div>No data available for the last 60 days.</div>;
    }

    return (
        <div className='w-[250px] h-[150px]'>
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartComponent;
