import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin
Chart.register(ArcElement);

const PieChart = ({ data }) => {
    const labels = Object.keys(data);
    const percentages = Object.values(data);
    console.log(labels)

    // Generate shades of blue
    const generateRandomBlueShade = () => {
        const hue = Math.floor(Math.random() * 50) + 200; // Adjust the hue for shades of blue
        const saturation = Math.floor(Math.random() * 60) + 40; // Adjust the saturation for different shades
        const lightness = Math.floor(Math.random() * 40) + 40; // Adjust the lightness for different shades
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const colors = Array.from({ length: labels.length }, () => generateRandomBlueShade());

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
            datalabels: { // Configure the datalabels plugin
                color: '#fff', // Set color for the labels
                formatter: (value, context) => {
                    const labelIndex = context.dataIndex;
                    return context.chart.data.labels[labelIndex];
                }
            }
        },
    };

    return (
        <div className='flex flex-col gap-5'>
            <h5 className='text-white text-center font-bold text-xl'>Assets in strategies ratio</h5>
            <Pie data={chartData} options={options} />
            <div>
                {Object.entries(data).map(([key, value], index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className='flex gap-3 items-center'>
                            <div style={{ backgroundColor: colors[index], width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px' }}></div>
                            <span className='text-white w-[100px] font-medium text-xl'>{key}</span>
                        </div>

                        <span className='font-medium  text-white text-xl'>{value} %</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
