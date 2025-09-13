import React from "react";

export default function OrderCard({ order }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      padding: "1rem",
      marginBottom: "1rem"
    }}>
      <h4>Order #{order.id}</h4>
      <p><strong>Table:</strong> {order.table}</p>
      <p><strong>Items:</strong> {order.items.join(", ")}</p>
      <p><strong>Total:</strong> {order.total} ETB</p>
      <p><strong>Status:</strong> {order.status}</p>
    </div>
  );
}
