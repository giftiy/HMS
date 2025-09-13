// src/components/chef/ChefOrderCard.jsx
import React from "react";
import PropTypes from "prop-types";

export default function OrderCard({ order = {}, onMarkPrepared = () => {} }) {
  // Safe defaults to prevent undefined errors
  const { id = "N/A", status = "pending", table = "Unknown", items = [] } = order;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        transition: "all 0.3s",
      }}
    >
      {/* Order Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <h4 style={{ margin: 0, color: "#3B3B3B" }}>Order #{id}</h4>
        <span
          style={{
            backgroundColor: status === "pending" ? "#FFADAD" : "#A0FFA0",
            color: "#3B3B3B",
            padding: "3px 8px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: "600",
          }}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Order Details */}
      <div style={{ marginBottom: "0.5rem" }}>
        <p style={{ margin: "0.2rem 0", fontWeight: "500" }}>Table: {table}</p>
        <p style={{ margin: "0.2rem 0", fontWeight: "500" }}>Items:</p>
        {items.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
            {items.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: "0.2rem 0", fontStyle: "italic", color: "#888" }}>No items</p>
        )}
      </div>

      {/* Actions */}
      {status === "pending" && (
        <button
          onClick={() => onMarkPrepared(id)}
          style={{
            padding: "8px 12px",
            backgroundColor: "#BFEAE6",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            color: "#3B3B3B",
          }}
        >
          Mark as Prepared
        </button>
      )}
    </div>
  );
}

// Optional: PropTypes for better safety
OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    table: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        quantity: PropTypes.number,
      })
    ),
  }),
  onMarkPrepared: PropTypes.func,
};
