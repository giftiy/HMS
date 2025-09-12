// src/components/Reports.jsx
import React from "react";

const sampleReports = [
  { id: 1, title: "Daily Orders", value: 120 },
  { id: 2, title: "Total Revenue", value: "ETB 12,500" },
  { id: 3, title: "Pending Orders", value: 8 },
  { id: 4, title: "Employees Active Today", value: 15 },
];

const detailedReport = [
  { id: 1, name: "John Doe", orders: 25, revenue: 2500 },
  { id: 2, name: "Jane Smith", orders: 30, revenue: 3200 },
  { id: 3, name: "Mike Johnson", orders: 20, revenue: 2100 },
  { id: 4, name: "Emily Davis", orders: 15, revenue: 1800 },
];

export default function Reports() {
  return (
    <div style={{ padding: "2rem", background: "#f4f6f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "2rem" }}>Reports</h2>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {sampleReports.map((report) => (
          <div
            key={report.id}
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#2196F3" }}>
              {report.title}
            </h3>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "1.5rem", fontWeight: "bold" }}>
              {report.value}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Table */}
      <div style={{ overflowX: "auto", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#2196F3", color: "#fff" }}>
            <tr>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>ID</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Employee</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Orders</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Revenue (ETB)</th>
            </tr>
          </thead>
          <tbody>
            {detailedReport.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.75rem" }}>{row.id}</td>
                <td style={{ padding: "0.75rem" }}>{row.name}</td>
                <td style={{ padding: "0.75rem" }}>{row.orders}</td>
                <td style={{ padding: "0.75rem" }}>{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
