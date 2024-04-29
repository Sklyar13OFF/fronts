import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return null;
    }

    const chartData = {
        labels: Array.from({ length: data.length }, (_, i) => i + 1), 
        datasets: [
            {
                data: data,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    color: 'white',
                },
                grid: {
                    display: false,
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    display: false, // Explicitly hide x-axis tick labels
                    maxTicksLimit: 0, // Attempt to limit the number of ticks to 0
                },
            },
            y: {
                title: {
                    display: true,
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    display: false, // Explicitly hide y-axis tick labels
                    maxTicksLimit: 0, // Attempt to limit the number of ticks to 0
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false, // Disable tooltips
            },
        },
    };
    return (
        <div className='flex flex-col h-full w-full overflow-y-auto p-4 gap-5'>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
