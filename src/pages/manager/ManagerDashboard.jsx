// src/pages/manager/ManagerDashboard.jsx
import React, { useState } from "react";
import Sidebar from "../../components/manager/Sidebar";
import Navbar from "../../components/manager/Navbar";
import DashboardCard from "../../components/DashboardCard";
import ChartBar from "../../components/manager/ChartBar";
import ChartCircle from "../../components/manager/ChartCircle";
import { FaClipboardList, FaStar, FaBoxOpen } from "react-icons/fa";

export default function ManagerDashboard() {
  const [totalProducts] = useState(120);
  const [ordersToday] = useState(35);
  const [activeUsers] = useState(58);

  const sampleData = [
    { label: "Mon", value: 40 },
    { label: "Tue", value: 55 },
    { label: "Wed", value: 30 },
    { label: "Thu", value: 70 },
    { label: "Fri", value: 60 },
  ];

  const recentOrders = [
    { id: 1, product: "Coffee", customer: "Emily", amount: 3, status: "Delivered" },
    { id: 2, product: "Sandwich", customer: "John", amount: 2, status: "Pending" },
    { id: 3, product: "Cake", customer: "Sarah", amount: 1, status: "Delivered" },
  ];

  const topProducts = [
    { name: "Coffee", sold: 150 },
    { name: "Sandwich", sold: 120 },
    { name: "Cake", sold: 80 },
  ];

  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#f0f4f8" },
    sidebar: { width: "240px" },
    mainContent: { flex: 1, display: "flex", flexDirection: "column" },
    navbarWrapper: {
      width: "100%",
      background: "#0086ba",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      zIndex: 1000,
    },
    contentWrapper: {
      flex: 1,
      padding: "2rem",
      display: "flex",
      justifyContent: "center",
    },
    dashboardBox: { maxWidth: "1200px", width: "100%" },
    header: {
      textAlign: "center",
      fontSize: "2.2rem",
      fontWeight: "700",
      marginBottom: "2rem",
      color: "#1e2a38",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2.5rem",
    },
    sectionCard: {
      background: "#fff",
      borderRadius: "16px",
      padding: "1.5rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      flex: 1,
      minWidth: "300px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    sectionCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
    },
    sectionTitle: {
      marginBottom: "1.5rem",
      color: "#1e2a38",
      fontSize: "1.5rem",
      fontWeight: "600",
      textAlign: "center",
    },
    chartWrapper: { display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" },
    chartBox: { flex: 2, minWidth: "400px" },
    circleBox: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "250px",
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      padding: "0.75rem",
      textAlign: "left",
      backgroundColor: "#e0f0ff",
      color: "#1e2a38",
      fontWeight: "600",
    },
    td: { padding: "0.75rem", borderBottom: "1px solid #eee" },
    badgeDelivered: {
      padding: "0.3rem 0.6rem",
      borderRadius: "5px",
      color: "#fff",
      backgroundColor: "#4CAF50",
      fontSize: "0.85rem",
    },
    badgePending: {
      padding: "0.3rem 0.6rem",
      borderRadius: "5px",
      color: "#fff",
      backgroundColor: "#FF9800",
      fontSize: "0.85rem",
    },
    listItem: {
      padding: "0.5rem",
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "space-between",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Navbar on top */}
        <div style={styles.navbarWrapper}>
          <Navbar />
        </div>

        {/* Dashboard content */}
        <div style={styles.contentWrapper}>
          <div style={styles.dashboardBox}>
            <h2 style={styles.header}>Manager Dashboard</h2>

            {/* Dashboard Cards */}
            <div style={styles.cardGrid}>
              <DashboardCard
                title="Total Products"
                value={totalProducts}
                icon={<FaBoxOpen />}
                gradient="linear-gradient(135deg, #00adef, #0086ba)"
              />
              <DashboardCard
                title="Orders Today"
                value={ordersToday}
                icon={<FaClipboardList />}
                gradient="linear-gradient(135deg, #FFB74D, #FF9800)"
              />
              <DashboardCard
                title="Active Users"
                value={activeUsers}
                icon={<FaStar />}
                gradient="linear-gradient(135deg, #81C784, #4CAF50)"
              />
            </div>

            {/* Charts Section */}
            <div style={styles.chartWrapper}>
              <div
                style={styles.sectionCard}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.sectionCardHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h3 style={styles.sectionTitle}>Orders Per Day</h3>
                <ChartBar data={sampleData} title="" />
              </div>
              <div
                style={styles.sectionCard}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.sectionCardHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h3 style={styles.sectionTitle}>Stock Filled</h3>
                <div style={styles.circleBox}>
                  <ChartCircle percentage={75} label="" color="#0086ba" size={160} />
                </div>
              </div>
            </div>

            {/* Orders & Products */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
              {/* Recent Orders */}
              <div
                style={styles.sectionCard}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.sectionCardHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h3 style={styles.sectionTitle}>Recent Orders</h3>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Product</th>
                      <th style={styles.th}>Customer</th>
                      <th style={styles.th}>Qty</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o.id}>
                        <td style={styles.td}>{o.product}</td>
                        <td style={styles.td}>{o.customer}</td>
                        <td style={styles.td}>{o.amount}</td>
                        <td style={styles.td}>
                          <span
                            style={
                              o.status === "Delivered"
                                ? styles.badgeDelivered
                                : styles.badgePending
                            }
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Products */}
              <div
                style={styles.sectionCard}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.sectionCardHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h3 style={styles.sectionTitle}>Top Products</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {topProducts.map((p, index) => (
                    <li key={index} style={styles.listItem}>
                      <span>{p.name}</span>
                      <span style={{ fontWeight: "600" }}>{p.sold} sold</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
