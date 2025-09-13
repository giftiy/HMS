import React from "react";

export default function OrderNotification({ message, time }) {
  return (
    <div
      style={{
        background: "#f4f6f8",
        padding: "0.8rem 1rem",
        borderRadius: "8px",
        marginBottom: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <span style={{ fontWeight: "500", color: "#1e2a38" }}>{message}</span>
      <span style={{ fontSize: "0.85rem", color: "#888" }}>{time}</span>
    </div>
  );
}
