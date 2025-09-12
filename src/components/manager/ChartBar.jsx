// src/components/ChartBar.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartBar({ data, title = "Orders Per Day" }) {
  // Extract labels and values from data
  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);

  // Chart dataset with gradient
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#BFEAE6");
          gradient.addColorStop(1, "#3BC1B8");
          return gradient;
        },
        borderColor: "#3B3B3B",
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 10,
        hoverBackgroundColor: "#3BC1B8",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#3B3B3B",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        titleFont: { weight: "600", size: 11 },
        bodyFont: { weight: "500", size: 10 },
        padding: 8,
        cornerRadius: 6,
      },
      title: {
        display: true,
        text: title,
        color: "#3B3B3B",
        font: { size: 12, weight: "700" },
        padding: { top: 8, bottom: 12 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#3B3B3B", font: { weight: "500", size: 10 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#3B3B3B", font: { weight: "500", size: 10 }, stepSize: 50 },
        grid: { color: "#FFFAF2", borderDash: [3, 3] },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  // Render chart in smaller card
  return (
    <div
      style={{
        background: "#FFF7F0",
        padding: "0.8rem",
        borderRadius: "14px",
        boxShadow: "0 4px 15px rgba(59,59,59,0.07)",
        width: "300px", // smaller width
        height: "200px", // smaller height
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
}
