import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";

ChartJS.register(ArcElement, Legend);

const DoughnutChart = ({ rawData }) => {
  const [transformedData, setTransformedData] = useState([]);
  const [centerText, setCenterText] = useState({ label: "", value: "" });
  const [offsets, setOffsets] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    console.log("Received rawData:", rawData);
    if (rawData && typeof rawData === "object") {
      // Transform the raw data from the backend
      const transformed = Object.entries(rawData).map(([name, percentage]) => ({
        name,
        percentage: parseFloat(percentage), // Convert string to number
      }));
      console.log("Transformed data:", transformed);
      setTransformedData(transformed);

      // Initialize center text and offsets with valid data
      if (transformed.length > 0) {
        setCenterText({
          label: transformed[0].name,
          value: `${transformed[0].percentage}%`,
        });
        setOffsets(new Array(transformed.length).fill(0));
      }
    }
  }, [rawData]);

  if (transformedData.length === 0) {
    return <p>No data available</p>;
  }

  const labels = transformedData.map((item) => item.name);
  const percentages = transformedData.map((item) => item.percentage);

  const generateRandomBlueShade = () => {
    const hue = Math.floor(Math.random() * 50) + 200;
    const saturation = Math.floor(Math.random() * 60) + 40;
    const lightness = Math.floor(Math.random() * 40) + 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const colors = Array.from({ length: labels.length }, generateRandomBlueShade);

  const chartData = {
    labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
        borderWidth: 0,
        offset: offsets, // Apply dynamic offsets
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%",
    layout: {
      padding: 20,
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    animation: {
      animateScale: true,
    },
    hover: {
      mode: "nearest",
      intersect: true,
      animationDuration: 400,
      onHover: (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const newOffsets = offsets.map((offset, i) => (i === index ? 20 : 0));
          setOffsets(newOffsets);
        } else {
          setOffsets(new Array(labels.length).fill(0));
        }
      },
    },
    onClick: (e, element) => {
      if (element.length > 0) {
        const index = element[0].index;
        setCenterText({
          label: labels[index],
          value: `${percentages[index]}%`,
        });

        const newOffsets = offsets.map((offset, i) => (i === index ? 39 : 0));
        setOffsets(newOffsets);
        setSelectedIndex(index);
      }
    },
  };

  const handleLabelClick = (index) => {
    setCenterText({
      label: labels[index],
      value: `${percentages[index]}%`,
    });

    const newOffsets = offsets.map((offset, i) => (i === index ? 39 : 0));
    setOffsets(newOffsets);
    setSelectedIndex(index);
  };

  return (
    <div className="flex item-center gap-5">
      <div style={{ position: "relative" }}>
        <Doughnut data={chartData} options={options} />
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <h2 className="text-root-white text-lg font-semibold">
            {centerText.value}
          </h2>
          <h2 className="text-root-white text-xl font-semibold">
            {centerText.label}
          </h2>
        </div>
      </div>
      <div className="h-[300px] max-h-[300px] overflow-y-auto overflow-x-hidden">
        {transformedData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleLabelClick(index)}
            className={`rounded-[20px] select-none bg-log-bkg cursor-pointer mx-[5px] mb-2 py-1 px-2 inline-block`}
            style={{
              backgroundColor:
                selectedIndex === index ? `${colors[index]}1F` : "",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: colors[index],
                borderRadius: "50%",
                marginRight: "5px",
              }}
            ></span>
            <span
              className="font-semibold text-sm mr-2 text-light-gr"
              style={{
                color: selectedIndex === index ? colors[index] : "",
              }}
            >
              {item.name}
            </span>
            <span className="text-root-white text-sm font-semibold">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
