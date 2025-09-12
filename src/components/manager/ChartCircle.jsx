// src/components/ChartCircle.jsx
import React, { useEffect, useState } from "react";

export default function ChartCircle({ percentage = 75, label = "Completion", color = "#BFEAE6" }) {
  const [progress, setProgress] = useState(0);
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start > percentage) clearInterval(interval);
      setProgress(start);
    }, 15); // Smooth animation
    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1rem",
        background: "#FFFAF2",
        padding: "0.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(59,59,59,0.15)",
        width: "100px",
        height: "100px",
      }}
    >
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#EEE"
          fill="none"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <text
          x={radius}
          y={radius + 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill="#3B3B3B"
        >
          {progress}%
        </text>
      </svg>
      <span style={{ marginTop: "0.3rem", fontSize: "0.75rem", color: "#3B3B3B", textAlign: "center" }}>
        {label}
      </span>
    </div>
  );
}
