// src/pages/cashier/CashierDashboard.jsx
import React, { useState } from "react";
import Navbar from "../../components/cashier/Navbar";
import Sidebar from "../../components/cashier/Sidebar";
import StatCard from "../../components/cashier/StatCard";
import NotificationCard from "../../components/cashier/NotificationCard";
import {
  FaChartLine,
  FaClipboardList,
  FaBell,
  FaCheckCircle,
  FaHistory,
  FaUtensils,
} from "react-icons/fa";

export default function CashierDashboard() {
  // Mock data
  const [orders, setOrders] = useState([
    { id: 1, table: "1", waiter: "Alice", product: "Burger", amount: 120, status: "Pending" },
    { id: 2, table: "2", waiter: "Bob", product: "Pizza", amount: 250, status: "Pending" },
    { id: 3, table: "3", waiter: "Charlie", product: "Pasta", amount: 180, status: "Completed" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received from Alice", readFlag: false },
    { id: 2, message: "Daily summary ready", readFlag: true },
    { id: 3, message: "System update successful", readFlag: true },
  ]);

  // Stats
  const completedOrders = orders.filter((o) => o.status === "Completed").length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const totalRevenue = orders.reduce((sum, o) => (o.status === "Completed" ? sum + o.amount : sum), 0);
  const unreadNotifications = notifications.filter((n) => !n.readFlag).length;

  // Styles
  const dashboardStyles = {
    container: { marginLeft: "240px", padding: "2rem", background: "#f5f7fb", minHeight: "100vh" },
    header: { marginBottom: "2rem", fontWeight: "700", color: "#1e2a38", textAlign: "center", fontSize: "2rem" },
    cardGrid: { display: "flex", gap: "1rem", marginBottom: "2.5rem", overflowX: "auto" },
    sectionBox: { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 8px 20px rgba(0,0,0,0.05)", marginBottom: "2.5rem" },
    sectionTitle: { marginBottom: "1rem", color: "#1e2a38", fontSize: "1.5rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" },
    taskTable: { width: "100%", borderCollapse: "collapse", marginTop: "1rem" },
    th: { textAlign: "left", borderBottom: "2px solid #ddd", padding: "0.8rem", color: "#1e2a38", fontWeight: "600" },
    td: { padding: "0.8rem", borderBottom: "1px solid #eee", color: "#444" },
    completeBtn: { padding: "0.4rem 0.8rem", background: "#1976D2", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "5px" },
    doneTag: { color: "#4CAF50", fontWeight: "600" },
    noNotification: { color: "#888", fontStyle: "italic", padding: "0.5rem 0" },
  };

  const handleComplete = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Completed" } : o))
    );
    // Optional: add notification
    setNotifications((prev) => [
      { id: Date.now(), message: `Order ${id} completed`, readFlag: false },
      ...prev,
    ]);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div style={dashboardStyles.container}>
        <h2 style={dashboardStyles.header}>💵 Cashier Dashboard</h2>

        {/* Summary Cards */}
        <div style={dashboardStyles.cardGrid}>
          <StatCard title="Completed Orders" value={completedOrders} icon={<FaChartLine />} gradient="linear-gradient(135deg, #81C784, #4CAF50)" />
          <StatCard title="Pending Orders" value={pendingOrders} icon={<FaClipboardList />} gradient="linear-gradient(135deg, #FFB74D, #FF9800)" />
          <StatCard title="Total Revenue (ETB)" value={totalRevenue} icon={<FaUtensils />} gradient="linear-gradient(135deg, #64B5F6, #1976D2)" />
          <StatCard title="Unread Notifications" value={unreadNotifications} icon={<FaBell />} gradient="linear-gradient(135deg, #BA68C8, #8E24AA)" />
        </div>

        {/* Orders Table */}
        <div style={dashboardStyles.sectionBox}>
          <h3 style={dashboardStyles.sectionTitle}><FaClipboardList /> Orders Pending</h3>
          <table style={dashboardStyles.taskTable}>
            <thead>
              <tr>
                <th style={dashboardStyles.th}>Table</th>
                <th style={dashboardStyles.th}>Waiter</th>
                <th style={dashboardStyles.th}>Product</th>
                <th style={dashboardStyles.th}>Amount</th>
                <th style={dashboardStyles.th}>Status</th>
                <th style={dashboardStyles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td style={dashboardStyles.td}>{o.table}</td>
                  <td style={dashboardStyles.td}>{o.waiter}</td>
                  <td style={dashboardStyles.td}>{o.product}</td>
                  <td style={dashboardStyles.td}>{o.amount}</td>
                  <td style={dashboardStyles.td}>
                    {o.status === "Completed" ? <span style={dashboardStyles.doneTag}>Completed</span> : o.status}
                  </td>
                  <td style={dashboardStyles.td}>
                    {o.status === "Pending" && (
                      <button style={dashboardStyles.completeBtn} onClick={() => handleComplete(o.id)}>
                        <FaCheckCircle /> Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Log */}
        <div style={dashboardStyles.sectionBox}>
          <h3 style={dashboardStyles.sectionTitle}><FaHistory /> Activity Log</h3>
          {orders.filter((o) => o.status === "Completed").length > 0 ? (
            orders.filter((o) => o.status === "Completed").map((o) => (
              <div key={o.id} style={{ marginBottom: "0.8rem", color: "#444" }}>
                ✅ {o.product} completed for Table {o.table} by {o.waiter}
              </div>
            ))
          ) : (
            <p style={dashboardStyles.noNotification}>No activity yet.</p>
          )}
        </div>

        {/* Notifications */}
        <div style={dashboardStyles.sectionBox}>
          <h3 style={dashboardStyles.sectionTitle}><FaBell /> Recent Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((n) => <NotificationCard key={n.id} message={n.message} read={n.readFlag} />)
          ) : (
            <p style={dashboardStyles.noNotification}>No notifications available</p>
          )}
        </div>
      </div>
    </div>
  );
}
