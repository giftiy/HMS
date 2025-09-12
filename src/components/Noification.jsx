import React, { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample notifications
  const notifications = [
    { id: 1, message: "New employee registered", time: "2 mins ago" },
    { id: 2, message: "Order #101 is ready", time: "10 mins ago" },
    { id: 3, message: "Payment received from Waiter John", time: "1 hour ago" },
    { id: 4, message: "Report generated", time: "2 hours ago" },
    { id: 5, message: "Menu updated by Manager", time: "Yesterday" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 2rem",
        background: "#2196F3",
        color: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.png"
          alt="Soreti Admin"
          style={{ width: "40px", height: "40px", marginRight: "0.75rem" }}
        />
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Soreti Admin</h1>
      </div>

      {/* Right: Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {/* Notification Icon */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaBell
            size={22}
            onClick={() => setShowNotifications(!showNotifications)}
          />
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "red",
              color: "#fff",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            {notifications.length}
          </span>

          {/* Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "35px",
                right: "0",
                width: "280px",
                background: "#fff",
                color: "#333",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 100,
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid #eee",
                      fontSize: "0.9rem",
                    }}
                  >
                    <p style={{ margin: 0 }}>{note.message}</p>
                    <small style={{ color: "#999" }}>{note.time}</small>
                  </div>
                ))
              ) : (
                <div style={{ padding: "1rem", textAlign: "center" }}>
                  No notifications
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div style={{ cursor: "pointer" }}>
          <FaUserCircle size={28} />
        </div>
      </div>
    </nav>
  );
}
