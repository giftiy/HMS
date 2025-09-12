// src/pages/ReportsPage.jsx
import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Sidebar from "../../components/manager/Sidebar";
import Navbar from "../../components/manager/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ReportsPage() {
  const [transactions] = useState([
    { id: 1, table: "Table 1", waiter: "John", cashier: "Emily", amount: 250, category: "Lunch", status: "Paid", time: "09:15 AM", date: "2025-09-07" },
    { id: 2, table: "Table 2", waiter: "Alice", cashier: "Emily", amount: 180, category: "Drinks", status: "Paid", time: "10:00 AM", date: "2025-09-07" },
    { id: 3, table: "Table 3", waiter: "Mark", cashier: "Sarah", amount: 320, category: "Dinner", status: "Paid", time: "11:30 AM", date: "2025-09-07" },
  ]);

  // Daily, weekly, and monthly income
  const dailyIncome = transactions.reduce((acc, t) => acc + t.amount, 0);

  const weekIncome = transactions
    .filter((t) => {
      const txDate = new Date(t.date);
      const now = new Date();
      const diff = (now - txDate) / (1000 * 60 * 60 * 24); // difference in days
      return diff <= 7; // transactions in the last 7 days
    })
    .reduce((acc, t) => acc + t.amount, 0);

  const monthIncome = transactions
    .filter((t) => {
      const txDate = new Date(t.date);
      const now = new Date();
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((acc, t) => acc + t.amount, 0);

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 8, 15, 22, 10, 5],
        backgroundColor: "#2196F3",
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Orders per Day", font: { size: 16 } },
    },
    scales: { y: { beginAtZero: true } },
  };

  const doughnutData = {
    labels: ["Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"],
    datasets: [
      {
        label: "Revenue (ETB)",
        data: [600, 1200, 1500, 500, 800],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
        hoverOffset: 10,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { font: { size: 12 }, padding: 10 } },
      title: { display: true, text: "Revenue by Category", font: { size: 16 } },
    },
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main
        style={{
          marginLeft: "220px",
          padding: "2rem",
          paddingTop: "20px",
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
      >
        <h2
          style={{
            marginBottom: "2rem",
            color: "#333",
            fontSize: "1.8rem",
            textAlign: "center",
          }}
        >
          Reports
        </h2>

        {/* Charts */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 300px",
              background: "#fff",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              height: "220px",
            }}
          >
            <Bar data={barData} options={barOptions} />
          </div>

          <div
            style={{
              flex: "1 1 300px",
              background: "#fff",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              height: "220px",
            }}
          >
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Income Cards */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 250px",
              background: "#2196F3",
              padding: "1.5rem",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1.2rem",
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            }}
          >
            Daily Income: ETB {dailyIncome}
          </div>
          <div
            style={{
              flex: "1 1 250px",
              background: "#4CAF50",
              padding: "1.5rem",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1.2rem",
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            }}
          >
            Weekly Income: ETB {weekIncome}
          </div>
          <div
            style={{
              flex: "1 1 250px",
              background: "#FF9800",
              padding: "1.5rem",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1.2rem",
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            }}
          >
            Monthly Income: ETB {monthIncome}
          </div>
        </div>

        {/* Transactions Table */}
        <div
          style={{
            marginTop: "2rem",
            background: "#fff",
            padding: "1rem",
            borderRadius: "12px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            overflowX: "auto",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#333" }}>
            Cashier Transactions
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.95rem",
            }}
          >
            <thead style={{ backgroundColor: "#2196F3", color: "#fff" }}>
              <tr>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>#</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Table</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Waiter</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Cashier</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Category</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Status</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Time</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, idx) => (
                <tr
                  key={t.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff",
                    transition: "0.2s",
                    cursor: "default",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#E3F2FD")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? "#f9f9f9" : "#fff")
                  }
                >
                  <td style={{ padding: "0.5rem" }}>{t.id}</td>
                  <td style={{ padding: "0.5rem" }}>{t.table}</td>
                  <td style={{ padding: "0.5rem" }}>{t.waiter}</td>
                  <td style={{ padding: "0.5rem" }}>{t.cashier}</td>
                  <td style={{ padding: "0.5rem" }}>{t.category}</td>
                  <td style={{ padding: "0.5rem" }}>{t.amount}</td>
                  <td style={{ padding: "0.5rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "8px",
                        color: "#fff",
                        backgroundColor:
                          t.status === "Paid" ? "#4CAF50" : "#FF9800",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.5rem" }}>{t.time}</td>
                  <td style={{ padding: "0.5rem" }}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
