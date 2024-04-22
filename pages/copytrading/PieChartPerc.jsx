import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin
Chart.register(ArcElement);

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
        datalabels: {
            color: '#fff',
            formatter: (value, context) => {
                const labelIndex = context.dataIndex;
                const label = context.chart.data.labels[labelIndex];
                const side = data[labelIndex].side; // Access the "side" property from the data object
                return `${label} (${side}): ${value}%`; // Add side information to the label
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
                        <span className={`font-medium  text-xl ${item.side=='L' ? 'text-green-500' : 'text-red-500'}`}>{item.name=='USDT' ?'': item.side}  </span>

                        <span className='font-medium  text-white text-xl'>{item.percentage} %</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartPerc;