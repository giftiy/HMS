// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import ChartBar from "../components/ChartBar";
import ChartCircle from "../components/ChartCircle";
import { FaUsers, FaBell, FaFileAlt, FaDollarSign, FaClipboardList, FaStar } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Hardcoded/mock frontend-only data
  const [employeeCount] = useState(12);
  const [unreadNotifications] = useState(3);
  const recentTransactions = [
    { id: 1, table: "Table 1", cashier: "Emily", amount: 250, status: "Paid" },
    { id: 2, table: "Table 2", cashier: "John", amount: 180, status: "Pending" },
    { id: 3, table: "Table 3", cashier: "Sarah", amount: 320, status: "Paid" },
  ];

  const topEmployees = [
    { name: "Emily", sales: 1200 },
    { name: "John", sales: 980 },
    { name: "Sarah", sales: 850 },
  ];

  const barData = [
    { label: "Mon", value: 50 },
    { label: "Tue", value: 80 },
    { label: "Wed", value: 65 },
    { label: "Thu", value: 90 },
    { label: "Fri", value: 75 },
    { label: "Sat", value: 60 },
    { label: "Sun", value: 100 },
  ];

  const dashboardStyles = {
    container: { marginLeft: "220px", padding: "2rem", paddingTop: "20px", background: "#f0f4f8", minHeight: "100vh" },
    header: { marginBottom: "2rem", fontWeight: "700", color: "#1e2a38", textAlign: "center", fontSize: "2.2rem" },
    cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" },
    sectionBox: { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", marginBottom: "2.5rem" },
    sectionTitle: { marginBottom: "1.5rem", color: "#1e2a38", fontSize: "1.5rem", fontWeight: "600", textAlign: "center" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { padding: "0.75rem", textAlign: "left", backgroundColor: "#e0f0ff", color: "#1e2a38" },
    td: { padding: "0.75rem", borderBottom: "1px solid #eee" },
    badgePaid: { padding: "0.3rem 0.6rem", borderRadius: "5px", color: "#fff", backgroundColor: "#4CAF50", fontSize: "0.85rem" },
    badgePending: { padding: "0.3rem 0.6rem", borderRadius: "5px", color: "#fff", backgroundColor: "#FF9800", fontSize: "0.85rem" },
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div style={dashboardStyles.container}>
        <h2 style={dashboardStyles.header}>Admin Dashboard</h2>

        {/* Dashboard Cards */}
        <div style={dashboardStyles.cardGrid}>
          <DashboardCard
            title="Employees"
            value={employeeCount}
            icon={<FaUsers />}
            gradient="linear-gradient(135deg, #6EC1E4, #2196F3)"
            onClick={() => navigate("/employees")}
          />
          <DashboardCard
            title="Notifications"
            value={unreadNotifications}
            icon={<FaBell />}
            gradient="linear-gradient(135deg, #FFB74D, #FF9800)"
            onClick={() => navigate("/notifications")}
          />
          <DashboardCard
            title="Reports"
            value="32"
            icon={<FaFileAlt />}
            gradient="linear-gradient(135deg, #BA68C8, #9C27B0)"
            onClick={() => navigate("/reports")}
          />
          <DashboardCard
            title="Revenue"
            value="ETB 12,400"
            icon={<FaDollarSign />}
            gradient="linear-gradient(135deg, #81C784, #4CAF50)"
            onClick={() => navigate("/revenue")}
          />
        </div>

        {/* Orders Overview Section */}
        <div style={dashboardStyles.sectionBox}>
          <h3 style={dashboardStyles.sectionTitle}>Orders Overview</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ flex: 2, minWidth: "400px" }}>
              <ChartBar data={barData} title="Orders per Day" />
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", minWidth: "250px" }}>
              <ChartCircle percentage={75} label="Orders Paid" color="#4CAF50" size={140} />
              <ChartCircle percentage={25} label="Orders Pending" color="#FF9800" size={140} />
            </div>
          </div>
        </div>

        {/* Recent Transactions & Top Employees */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          {/* Recent Transactions */}
          <div style={{ flex: "1 1 400px", background: "#fff", padding: "1rem", borderRadius: "12px", boxShadow: "0 8px 25px rgba(0,0,0,0.05)", minWidth: "300px" }}>
            <h3 style={{ marginBottom: "1rem", color: "#1e2a38" }}>
              <FaClipboardList style={{ marginRight: "0.5rem" }} /> Recent Transactions
            </h3>
            <table style={dashboardStyles.table}>
              <thead>
                <tr>
                  <th style={dashboardStyles.th}>Table</th>
                  <th style={dashboardStyles.th}>Cashier</th>
                  <th style={dashboardStyles.th}>Amount</th>
                  <th style={dashboardStyles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <tr key={t.id}>
                    <td style={dashboardStyles.td}>{t.table}</td>
                    <td style={dashboardStyles.td}>{t.cashier}</td>
                    <td style={dashboardStyles.td}>{t.amount}</td>
                    <td style={dashboardStyles.td}>
                      <span style={t.status === "Paid" ? dashboardStyles.badgePaid : dashboardStyles.badgePending}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Employees */}
          <div style={{ flex: "1 1 300px", background: "#fff", padding: "1rem", borderRadius: "12px", boxShadow: "0 8px 25px rgba(0,0,0,0.05)", minWidth: "250px" }}>
            <h3 style={{ marginBottom: "1rem", color: "#1e2a38" }}>
              <FaStar style={{ marginRight: "0.5rem" }} /> Top Employees
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {topEmployees.map((e, index) => (
                <li key={index} style={{ padding: "0.5rem", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
                  <span>{e.name}</span>
                  <span style={{ fontWeight: "600" }}>ETB {e.sales}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
