// src/components/cashier/StatCard.jsx
import React from "react";

export default function StatCard({ title, value, icon, gradient }) {
  const cardStyles = {
    background: gradient,
    borderRadius: "10px",
    padding: "0.8rem 1rem",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    minHeight: "70px",
    width: "220px", // 👈 xiqqeessuu
  };

  const leftBox = {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
  };

  const titleStyles = {
    fontSize: "0.75rem",
    fontWeight: "500",
    opacity: 0.85,
  };

  const valueStyles = {
    fontSize: "1.1rem",
    fontWeight: "700",
    lineHeight: "1.1",
  };

  const iconBox = {
    fontSize: "1.5rem",
    opacity: 0.9,
  };

  return (
    <div style={cardStyles}>
      <div style={leftBox}>
        <div style={titleStyles}>{title}</div>
        <div style={valueStyles}>{value}</div>
      </div>
      <div style={iconBox}>{icon}</div>
    </div>
  );
}
