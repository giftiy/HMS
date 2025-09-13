// src/components/waiter/Sidebar.jsx
import React, { useState } from "react";
import { 
  FaTachometerAlt, 
  FaClipboardList, 
  FaBell, 
  FaUtensils, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/waiter/dashboard" },
    { name: "Orders", icon: <FaClipboardList />, path: "/waiter/orders" },
    { name: "Notifications", icon: <FaBell />, path: "/waiter/notifications" },
    { name: "Menu/Product", icon: <FaUtensils />, path: "/waiter/products" },
    { name: "Profile/Settings", icon: <FaCog />, path: "/waiter/profile" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        width: collapsed ? "80px" : "220px",
        background: "#3B3B3B",
        color: "#FFF7F0",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s ease",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "4px 0 12px rgba(0,0,0,0.25)",
      }}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            padding: "1.2rem",
            borderBottom: "1px solid #BFEAE6",
            fontWeight: "bold",
            color: "#FFFAF2",
            fontSize: "1.4rem",
            letterSpacing: "1px",
          }}
        >
          {!collapsed && <span>Waiter Panel</span>}
        </div>

        {/* Collapse Button */}
        <div
          style={{
            padding: "0.6rem 1rem",
            cursor: "pointer",
            textAlign: collapsed ? "center" : "right",
            borderBottom: "1px solid #BFEAE6",
            color: "#BFEAE6",
            background: "#2A2A2A",
            transition: "all 0.3s",
            fontSize: "1.1rem",
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "»" : "«"}
        </div>

        {/* Menu Items */}
        <ul style={{ listStyle: "none", padding: "1rem 0.6rem", margin: 0 }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <li key={item.name} style={{ marginBottom: "0.4rem" }}>
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.75rem 1rem",
                    color: active ? "#3B3B3B" : "#FFF7F0",
                    background: active ? "#BFEAE6" : "transparent",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: active ? "600" : "400",
                    fontSize: "1rem",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = "#2A2A2A";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      marginRight: collapsed ? 0 : "1rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Section - Logout */}
      <div style={{ marginBottom: "1rem", padding: "0 0.6rem" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%",
            padding: "0.8rem 1rem",
            background: "#2A2A2A",
            border: "none",
            color: "#FFF7F0",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#BFEAE6")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2A2A2A")}
        >
          <FaSignOutAlt
            style={{
              marginRight: collapsed ? 0 : "0.8rem",
              fontSize: "1.2rem",
            }}
          />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
