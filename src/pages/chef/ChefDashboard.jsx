// src/pages/chef/ChefDashboard.jsx
import React, { useState } from "react";
import ChefNavbar from "../../components/chef/ChefNavbar";
import ChefSidebar from "../../components/chef/ChefSidebar";
import OrderCard from "../../components/chef/OrderCard";
import OrderNotification from "../../components/chef/OrderNotification";
import { FaUtensils, FaHourglassHalf, FaCheckCircle, FaBell } from "react-icons/fa";

export default function ChefDashboard() {
  const chefName = "Chef Gordon";

  const [orders, setOrders] = useState([
    { id: 1, table: "Table 1", items: ["Pizza", "Coke"], status: "Pending", waiter: "John" },
    { id: 2, table: "Table 2", items: ["Burger", "Fries"], status: "Cooking", waiter: "Alice" },
    { id: 3, table: "Table 3", items: ["Sandwich", "Tea"], status: "Pending", waiter: "Mark" },
  ]);

  const [notifications, setNotifications] = useState([]);

  const completeOrder = (orderId) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId ? { ...o, status: "Completed", chef: chefName } : o
      )
    );

    const completedOrder = orders.find(o => o.id === orderId);
    setNotifications(prev => [
      {
        id: Date.now(),
        message: `Order for ${completedOrder.table} completed by ${chefName} (Waiter: ${completedOrder.waiter})`,
        time: "Just now",
      },
      ...prev
    ]);
  };

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, { Pending: 0, Cooking: 0, Completed: 0 });

  const statusColors = { Pending: "#2196F3", Cooking: "#FF9800", Completed: "#4CAF50" };

  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#f0f4f8" },
    sidebar: { width: "220px", flexShrink: 0 },
    mainContent: { flex: 1, display: "flex", flexDirection: "column" },
    navbarWrapper: { width: "100%", zIndex: 10 },
    contentWrapper: { padding: "2rem", flex: 1 },
    header: { fontSize: "2.2rem", fontWeight: "700", marginBottom: "2rem", color: "#1e2a38", textAlign: "center" },
    cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" },
    sectionBox: { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", marginBottom: "2.5rem" },
    sectionTitle: { marginBottom: "1.5rem", color: "#1e2a38", fontSize: "1.5rem", fontWeight: "600", textAlign: "center" },
    orderList: { display: "grid", gap: "1rem" },
    orderItem: { background: "#f4f6f8", padding: "1rem", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    statusBadge: (status) => ({
      padding: "0.3rem 0.7rem",
      borderRadius: "6px",
      color: "#fff",
      fontWeight: "600",
      backgroundColor: statusColors[status] || "#777",
    }),
    completeBtn: {
      padding: "0.3rem 0.7rem",
      borderRadius: "6px",
      backgroundColor: "#2196F3",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      marginLeft: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <ChefSidebar />
      </div>
      <div style={styles.mainContent}>
        <div style={styles.navbarWrapper}>
          <ChefNavbar />
        </div>

        <div style={styles.contentWrapper}>
          <h2 style={styles.header}>Chef Dashboard</h2>

          {/* Top Cards */}
          <div style={styles.cardGrid}>
            <OrderCard title="Pending" count={statusCounts.Pending} icon={<FaHourglassHalf />} color="linear-gradient(135deg, #64B5F6, #1976D2)" />
            <OrderCard title="Cooking" count={statusCounts.Cooking} icon={<FaUtensils />} color="linear-gradient(135deg, #FFB74D, #F57C00)" />
            <OrderCard title="Completed" count={statusCounts.Completed} icon={<FaCheckCircle />} color="linear-gradient(135deg, #81C784, #388E3C)" />
            <OrderCard title="Notifications" count={notifications.length} icon={<FaBell />} color="linear-gradient(135deg, #FFB74D, #F57C00)" />
          </div>

          {/* Notifications */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>Notifications</h3>
            {notifications.length ? notifications.map(n => (
              <OrderNotification key={n.id} message={n.message} time={n.time} />
            )) : <p>No notifications yet</p>}
          </div>

          {/* Orders List */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>Recent Orders</h3>
            <div style={styles.orderList}>
              {orders.map(o => (
                <div key={o.id} style={styles.orderItem}>
                  <div>
                    <strong>{o.table}</strong> — {o.items.join(", ")}
                    <div style={{ fontSize: "0.85rem", color: "#555" }}>
                      Waiter: {o.waiter} | Chef: {o.chef || "In progress"}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={styles.statusBadge(o.status)}>{o.status}</span>
                    {o.status !== "Completed" && (
                      <button style={styles.completeBtn} onClick={() => completeOrder(o.id)}>Mark Complete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
