// src/pages/waiter/WaiterDashboard.jsx
import React from "react";
import Sidebar from "../../components/waiter/Sidebar";
import Navbar from "../../components/waiter/Navbar";
import { FaClipboardList, FaDollarSign, FaUtensils, FaBell } from "react-icons/fa";

export default function WaiterDashboard({ orders = [], notifications = [] }) {

  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const dashboardStyles = {
    container: { marginLeft: "220px", padding: "2rem", paddingTop: "20px", background: "#f4f6f9", minHeight: "100vh" },
    header: { marginBottom: "2rem", fontWeight: 700, color: "#1e2a38", textAlign: "center", fontSize: "2.2rem" },
    cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem", marginBottom: "2.5rem" },
    sectionBox: { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", marginBottom: "2.5rem" },
    sectionTitle: { marginBottom: "1.5rem", color: "#1e2a38", fontSize: "1.5rem", fontWeight: "600", textAlign: "center" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { padding: "0.75rem", textAlign: "left", backgroundColor: "#e0f0ff", color: "#1e2a38" },
    td: { padding: "0.75rem", borderBottom: "1px solid #eee" },
    badgePending: { padding: "0.3rem 0.6rem", borderRadius: "5px", color: "#fff", backgroundColor: "#FF9800", fontSize: "0.85rem" },
    badgeCompleted: { padding: "0.3rem 0.6rem", borderRadius: "5px", color: "#fff", backgroundColor: "#4CAF50", fontSize: "0.85rem" },
  };

  return (
    <div>
      <Sidebar />
      <Navbar />

      <div style={dashboardStyles.container}>
        <h2 style={dashboardStyles.header}>Waiter Dashboard</h2>

        {/* Stats Cards */}
        <div style={dashboardStyles.cardGrid}>
          <StatCard title="Pending Orders" value={pendingOrders} percentage={orders.length ? (pendingOrders / orders.length) * 100 : 0} color="#FFB400" icon={<FaClipboardList />} />
          <StatCard title="Completed Orders" value={completedOrders} percentage={orders.length ? (completedOrders / orders.length) * 100 : 0} color="#4CAF50" icon={<FaUtensils />} />
          <StatCard title="Total Revenue" value={`ETB ${totalRevenue}`} color="#0086BA" icon={<FaDollarSign />} showValueOnly />
          <StatCard title="Notifications" value={notifications.length} color="#FF6B6B" icon={<FaBell />} showValueOnly />
        </div>

        {/* Recent Orders Table */}
        <div style={dashboardStyles.sectionBox}>
          <h3 style={dashboardStyles.sectionTitle}>Recent Orders</h3>
          {orders.length === 0 ? (
            <p style={{ color: "#888" }}>No orders yet.</p>
          ) : (
            <table style={dashboardStyles.table}>
              <thead>
                <tr>
                  <th style={dashboardStyles.th}>Order ID</th>
                  <th style={dashboardStyles.th}>Table</th>
                  <th style={dashboardStyles.th}>Items</th>
                  <th style={dashboardStyles.th}>Total</th>
                  <th style={dashboardStyles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={dashboardStyles.td}>#{o.id}</td>
                    <td style={dashboardStyles.td}>{o.table}</td>
                    <td style={dashboardStyles.td}>{o.items.join(", ")}</td>
                    <td style={dashboardStyles.td}>{o.total} ETB</td>
                    <td style={dashboardStyles.td}>
                      <span style={o.status === "Pending" ? dashboardStyles.badgePending : dashboardStyles.badgeCompleted}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// StatCard component without external library
const StatCard = ({ title, value, percentage, color, icon, showValueOnly = false }) => (
  <div style={{
    background: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  }}>
    <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color }}>{icon}</div>
    <h4 style={{ marginBottom: "0.5rem", fontWeight: 600 }}>{title}</h4>
    {!showValueOnly ? (
      <div style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: `8px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "18px",
        color
      }}>
        {value}
      </div>
    ) : (
      <div style={{ fontSize: "2rem", fontWeight: 700, color }}>{value}</div>
    )}
  </div>
);
