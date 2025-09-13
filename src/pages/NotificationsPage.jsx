// src/pages/cashier/NotificationList.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaEnvelopeOpen, FaEnvelope, FaTrash } from "react-icons/fa";

export default function NotificationList() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received at Table 1", category: "Order", read: false, time: "09:30 AM", senderName: "Alice", role: "Waiter" },
    { id: 2, message: "Payment pending for Table 2", category: "Payment", read: false, time: "10:15 AM", senderName: "Bob", role: "Waiter" },
    { id: 3, message: "Daily revenue report ready", category: "Report", read: true, time: "11:00 AM", senderName: "Admin", role: "Manager" },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const categories = ["All", "Order", "Payment", "Report"];
  const [filter, setFilter] = useState("All");

  const filteredNotifications = filter === "All"
    ? notifications
    : notifications.filter(n => n.category === filter);

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    const notif = notifications.find(n => n.id === id);
    setSelectedNotification(notif);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (selectedNotification?.id === id) setSelectedNotification(null);
  };

  const styles = {
    container: { display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f4f6f9", fontFamily: "Arial, sans-serif" },
    navbarWrapper: { height: "60px", flexShrink: 0 },
    bodyWrapper: { display: "flex", flex: 1 },
    sidebarWrapper: { width: "220px" },
    mainPanel: { flex: 1, display: "flex", padding: "1rem", gap: "1rem", overflow: "hidden" },
    notificationList: { width: "350px", background: "#fff", borderRadius: "10px", padding: "1rem", overflowY: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
    notificationItem: (read) => ({
      padding: "12px",
      marginBottom: "8px",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: read ? "#f9f9f9" : "#e6f0ff",
      transition: "background 0.2s, transform 0.2s",
      borderLeft: read ? "4px solid transparent" : "4px solid #1976D2",
    }),
    detailPanel: { flex: 1, padding: "1.5rem", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
    categoryBar: { display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" },
    categoryBtn: (active) => ({
      padding: "6px 14px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      background: active ? "#0086ba" : "#e0e0e0",
      color: active ? "#fff" : "#1e2a38",
      fontWeight: 600,
      fontSize: "0.85rem",
      transition: "0.2s",
    }),
    timeText: { fontSize: "0.75rem", color: "#555", marginTop: "2px" },
    noNotification: { color: "#888", fontStyle: "italic", textAlign: "center", marginTop: "1rem" },
    senderInfo: { fontSize: "0.75rem", color: "#1976D2", fontStyle: "italic", marginTop: "2px" },
  };

  return (
    <div style={styles.container}>
      {/* Navbar full width */}
      <div style={styles.navbarWrapper}>
        <Navbar />
      </div>

      {/* Body: Sidebar + Main content */}
      <div style={styles.bodyWrapper}>
        {/* Sidebar */}
        <div style={styles.sidebarWrapper}><Sidebar /></div>

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
            {filteredNotifications.length === 0 && <p style={styles.noNotification}>No notifications available</p>}
            {filteredNotifications.map(n => (
              <div
                key={n.id}
                style={styles.notificationItem(n.read)}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                onClick={() => markRead(n.id)}
              >
                <div style={{ flex: 1 }}>
                  <div>{n.message}</div>
                  <div style={styles.senderInfo}>{n.senderName} ({n.role})</div>
                  <div style={styles.timeText}>{n.time}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {n.read ? <FaEnvelopeOpen color="#1976D2" /> : <FaEnvelope color="#1976D2" />}
                  <FaTrash style={{ color: "#FF4C4C", cursor: "pointer" }} onClick={() => deleteNotification(n.id)} />
                </div>
              </div>
            ))}
          </div>

          {/* Notification Detail */}
          <div style={styles.detailPanel}>
            {selectedNotification ? (
              <>
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{selectedNotification.category} Notification</h3>
                <p style={{ marginBottom: "0.5rem" }}>{selectedNotification.message}</p>
                <p style={{ marginBottom: "0.5rem", fontStyle: "italic" }}>Status: {selectedNotification.read ? "Read" : "Unread"}</p>
                <p style={{ marginBottom: "0.5rem", fontStyle: "italic" }}>Time: {selectedNotification.time}</p>
                <p style={{ marginBottom: "0.5rem", fontStyle: "italic", color: "#1976D2" }}>From: {selectedNotification.senderName} ({selectedNotification.role})</p>
              </>
            ) : (
              <p style={{ ...styles.noNotification, marginTop: "2rem" }}>Select a notification to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
