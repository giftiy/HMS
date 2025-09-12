// src/components/DashboardCard.jsx
import React from "react";

export default function DashboardCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        flex: "1",
        minWidth: "180px", // smaller width
        maxWidth: "220px",
        padding: "1rem",
        background: "#FFFAF2", // soft cream background
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(59,59,59,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(59,59,59,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(59,59,59,0.1)";
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: color || "#BFEAE6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          color: "#3B3B3B",
          marginRight: "0.75rem",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <h4
          style={{
            margin: 0,
            fontSize: "0.9rem",
            color: "#3B3B3B",
            fontWeight: "500",
          }}
        >
          {title}
        </h4>
        <h2
          style={{
            margin: 0,
            fontSize: "1.3rem",
            color: "#3B3B3B",
            fontWeight: "700",
          }}
        >
          {value}
        </h2>
      </div>
    </div>
  );
}
