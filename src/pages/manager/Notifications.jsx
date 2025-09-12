import React, { useState } from "react";
import Sidebar from "../../components/manager/Sidebar";
import Navbar from "../../components/manager/Navbar";

export default function NotificationsPage() {
  const roles = ["All", "Chef", "Cashier", "Waiter", "Manager"];
  const [activeRole, setActiveRole] = useState("All");

  // Sample notifications (frontend-only)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", role: "Chef", table: "3", foodType: "Pizza", payment: "Cash", readFlag: false, time: "10:30 AM" },
    { id: 2, message: "Payment received", role: "Cashier", table: "5", foodType: "-", payment: "Card", readFlag: true, time: "11:00 AM" },
    { id: 3, message: "Order served", role: "Waiter", table: "2", foodType: "Burger", payment: "Cash", readFlag: false, time: "11:15 AM" },
  ]);

  const [showDetail, setShowDetail] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);

  // ===================== Mark as Read =====================
  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, readFlag: true } : n)
    );
  };

  // ===================== Delete Notification =====================
  const handleDeleteNotification = (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      if (selectedNotif?.id === id) setShowDetail(false);
    }
  };

  // ===================== View Notification =====================
  const viewNotification = (notif) => {
    setSelectedNotif(notif);
    setShowDetail(true);
    if (!notif.readFlag) handleMarkAsRead(notif.id);
  };

  const filteredNotifications = activeRole === "All"
    ? notifications
    : notifications.filter(n => n.role === activeRole);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: "220px", padding: "2rem", paddingTop: "20px", background: "#f4f6f9", minHeight: "100vh" }}>
        <h2 style={{ marginBottom: "2rem", textAlign: "center", fontSize: "2rem", fontWeight: "700", color: "#3B3B3B" }}>Notifications</h2>

        {/* Role Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                border: activeRole === role ? "2px solid #2196F3" : "2px solid #ddd",
                backgroundColor: activeRole === role ? "#2196F3" : "#fff",
                color: activeRole === role ? "#fff" : "#333",
                fontWeight: activeRole === role ? "600" : "500",
                cursor: "pointer",
                transition: "0.3s"
              }}
            >
              {role}
            </button>
          ))}
        </div>

        {filteredNotifications.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>No notifications in this category</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, maxWidth: "800px", margin: "0 auto" }}>
            {filteredNotifications.map(notif => (
              <li
                key={notif.id}
                style={{
                  backgroundColor: !notif.readFlag ? "#E3F2FD" : "#fff",
                  border: "1px solid #ddd",
                  padding: "1rem 1.2rem",
                  marginBottom: "0.8rem",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onClick={() => viewNotification(notif)}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ fontSize: "1rem", color: "#333" }}>
                  <strong>{notif.role}</strong>: {notif.message}
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {!notif.readFlag && (
                    <span style={{
                      padding: "0.3rem 0.6rem",
                      backgroundColor: "#2196F3",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: "600"
                    }}>
                      Unread
                    </span>
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); handleDeleteNotification(notif.id); }}
                    style={{
                      padding: "0.3rem 0.6rem",
                      backgroundColor: "#FF4C4C",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Notification Detail Modal */}
        {showDetail && selectedNotif && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            padding: "1rem"
          }}>
            <div style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "450px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}>
              <h3 style={{ textAlign: "center", fontSize: "1.5rem", color: "#333", marginBottom: "1rem" }}>
                Notification Details
              </h3>
              <p><strong>Message:</strong> {selectedNotif.message}</p>
              <p><strong>Role:</strong> {selectedNotif.role}</p>
              <p><strong>Table:</strong> {selectedNotif.table}</p>
              <p><strong>Food Type:</strong> {selectedNotif.foodType}</p>
              <p><strong>Payment:</strong> {selectedNotif.payment}</p>
              <p><strong>Time:</strong> {selectedNotif.time}</p>
              <button
                onClick={() => setShowDetail(false)}
                style={{
                  padding: "0.5rem 1.2rem",
                  backgroundColor: "#2196F3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  alignSelf: "flex-end",
                  fontWeight: "600"
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1976D2")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2196F3")}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
