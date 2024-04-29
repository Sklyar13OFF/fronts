import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Corrected import for datalabels plugin

// Register necessary components and plugins
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChartPerc = ({ data }) => {
    if (!data) {
        // Handle case where data is null or undefined
        return null;
    }

    const labels = data.map(item => item.name);
    const percentages = data.map(item => item.percentage);

    // Generate shades of blue
    const generateRandomBlueShade = () => {
        const hue = Math.floor(Math.random() * 50) + 200; // Adjust the hue for shades of blue
        const saturation = Math.floor(Math.random() * 60) + 40; // Adjust the saturation for different shades
        const lightness = Math.floor(Math.random() * 40) + 40; // Adjust the lightness for different shades
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Corrected syntax for template literal
    };

    const colors = Array.from({ length: labels.length }, generateRandomBlueShade);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: percentages,
                backgroundColor: colors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            datalabels: {
                color: (context) => {
                    const side = data[context.dataIndex].side;
                    return side === 'L' ? 'green' : 'red';
                },
                font: {
                    size: 18, 
                },
                formatter: (value, context) => {
                    const labelIndex = context.dataIndex;
                    const side = data[labelIndex].side; 
                    return `${side}`; 
                }
            }
        },
    };

    return (
        <div className='flex flex-col h-[500px] overflow-y-auto p-4 gap-5'>
            <h5 className='text-white text-center font-bold text-xl'>Assets in strategies ratio</h5>
            <Pie data={chartData} options={options} />

            <div>
                {data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className='flex gap-3 items-center'>
                            <div style={{ backgroundColor: colors[index], width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px' }}></div>
                            <span className='text-white w-[100px] font-medium text-xl'>{item.name}</span>
                        </div>
                        <span className={`font-medium text-xl ${item.side === 'L' ? 'text-green-500' : 'text-red-500'}`}>{item.name === 'USDT' ? '' : item.side}</span>
                        <span className='font-medium text-white text-xl'>{item.percentage} %</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartPerc;