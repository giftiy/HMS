// src/pages/waiter/NotificationList.jsx
import React, { useState } from "react";
import Sidebar from "../../components/waiter/Sidebar";
import { FaBell, FaEnvelopeOpen, FaEnvelope, FaTrash } from "react-icons/fa";

export default function NotificationList() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New product added by manager", category: "Product", read: false, time: "09:30 AM" },
    { id: 2, message: "Order #5 completed by chef", category: "Order", read: false, time: "10:15 AM" },
    { id: 3, message: "Cashier confirmed payment for order #3", category: "Payment", read: false, time: "11:00 AM" },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const categories = ["All", "Product", "Order", "Payment"];
  const [filter, setFilter] = useState("All");

  const filteredNotifications = filter === "All"
    ? notifications
    : notifications.filter(n => n.category === filter);

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    const notif = notifications.find(n => n.id === id);
    setSelectedNotification(notif);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    if (selectedNotification?.id === id) setSelectedNotification(null);
  };

  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#f4f6f9" },
    sidebarWrapper: { width: "220px", position: "relative" },
    contentWrapper: { flex: 1, display: "flex", flexDirection: "column" },
    navbar: {
      height: "60px",
      background: "#0086ba",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "0 1rem",
      fontWeight: 700,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    mainPanel: { display: "flex", flex: 1 },
    notificationList: { width: "350px", background: "#fff", borderRight: "1px solid #ddd", padding: "1rem", overflowY: "auto" },
    notificationItem: (read) => ({
      padding: "10px 12px",
      marginBottom: "8px",
      borderRadius: "6px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: read ? "#f9f9f9" : "#e6f0ff",
      transition: "background 0.2s",
    }),
    markReadBtn: {
      background: "#0086ba",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "4px 8px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "0.75rem",
    },
    detailPanel: { flex: 1, padding: "1.5rem", background: "#fff" },
    categoryBar: { display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" },
    categoryBtn: (active) => ({
      padding: "5px 12px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      background: active ? "#0086ba" : "#e0e0e0",
      color: active ? "#fff" : "#1e2a38",
      fontWeight: 600,
      fontSize: "0.8rem",
      transition: "0.2s",
    }),
    notifHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    timeText: { fontSize: "0.75rem", color: "#555", marginTop: "2px" },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebarWrapper}>
        <Sidebar />
      </div>

      {/* Content */}
      <div style={styles.contentWrapper}>
        {/* Navbar */}
        <div style={styles.navbar}>
          <FaBell style={{ marginRight: "0.5rem" }} /> Notifications
        </div>

        {/* Main Panel */}
        <div style={styles.mainPanel}>
          {/* Notification List */}
          <div style={styles.notificationList}>
            {/* Category Filter */}
            <div style={styles.categoryBar}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={styles.categoryBtn(filter === cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Notifications */}
            {filteredNotifications.length === 0 && <p style={{ textAlign: "center", color: "#888" }}>No notifications</p>}
            {filteredNotifications.map(n => (
              <div
                key={n.id}
                style={styles.notificationItem(n.read)}
              >
                <div style={{ cursor: "pointer" }} onClick={() => markRead(n.id)}>
                  <div>{n.message}</div>
                  <div style={styles.timeText}>{n.time}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {n.read ? <FaEnvelopeOpen color="#0086ba" /> : <FaEnvelope color="#0086ba" />}
                  <FaTrash style={{ color: "#FF4C4C", cursor: "pointer" }} onClick={() => deleteNotification(n.id)} />
                </div>
              </div>
            ))}
          </div>

          {/* Notification Detail */}
          <div style={styles.detailPanel}>
            {selectedNotification ? (
              <>
                <h3 style={{ fontWeight: 700 }}>{selectedNotification.category} Notification</h3>
                <p style={{ marginTop: "0.5rem" }}>{selectedNotification.message}</p>
                <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>Status: {selectedNotification.read ? "Read" : "Unread"}</p>
                <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>Time: {selectedNotification.time}</p>
              </>
            ) : (
              <p style={{ color: "#888" }}>Select a notification to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
