// src/components/waiter/Navbar.jsx
import React, { useState } from "react";
import { FaBell, FaSignOutAlt, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  // Mock notifications (frontend-only)
  const notifications = [
    { id: 1, message: "New order assigned", readFlag: false },
    { id: 2, message: "Order served", readFlag: true },
    { id: 3, message: "Manager updated products", readFlag: false },
  ];

  const [waiterData, setWaiterData] = useState(() => {
    const savedData = localStorage.getItem("waiterData");
    return savedData
      ? JSON.parse(savedData)
      : { name: "Waiter User", email: "waiter@soreti.com", password: "", confirmPassword: "", photo: "" };
  });

  const saveToStorage = (data) => {
    localStorage.setItem("waiterData", JSON.stringify(data));
    setWaiterData(data);
  };

  const unreadCount = notifications.filter((n) => !n.readFlag).length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = (field, value) => saveToStorage({ ...waiterData, [field]: value });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => saveToStorage({ ...waiterData, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (waiterData.password && waiterData.password !== waiterData.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    const updatedData = { ...waiterData, password: "", confirmPassword: "" };
    saveToStorage(updatedData);
    alert("Profile updated successfully!");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#BFEAE6",
        color: "#3B3B3B",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        marginLeft: "220px", // match sidebar width
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Notifications */}
      <div
        style={{ position: "relative", cursor: "pointer", marginRight: "1.5rem" }}
        onClick={() => alert("Go to waiter notifications page")}
      >
        <FaBell size={22} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "#FF4C4C",
              color: "#FFF7F0",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              border: "1px solid #FFF7F0",
            }}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {/* Profile */}
      <div style={{ position: "relative" }}>
        <img
          src={waiterData.photo || "/default-avatar.png"}
          alt="Waiter"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            cursor: "pointer",
            border: "2px solid #FFF7F0",
          }}
          onClick={() => setShowProfile(!showProfile)}
        />
        {showProfile && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "0",
              width: "280px",
              background: "#FFFAF2",
              color: "#3B3B3B",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              zIndex: 100,
              padding: "1rem",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={waiterData.photo || "/default-avatar.png"}
                  alt="Waiter"
                  style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid #BFEAE6" }}
                />
                <label
                  htmlFor="photoUpload"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    background: "#3B3B3B",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "5px",
                    cursor: "pointer",
                    border: "1px solid #FFF7F0",
                  }}
                >
                  <FaCamera size={16} />
                </label>
                <input type="file" id="photoUpload" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              </div>
              <h3 style={{ margin: "0.5rem 0 0.25rem", fontWeight: "600" }}>{waiterData.name}</h3>
              <p style={{ margin: 0, color: "#555", fontSize: "0.85rem" }}>{waiterData.email}</p>
            </div>

            {["name", "email", "password", "confirmPassword"].map((field) => (
              <input
                key={field}
                type={field.includes("password") ? "password" : "text"}
                value={waiterData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginBottom: "0.5rem",
                  background: "#FFF7F2",
                  color: "#3B3B3B",
                  outline: "none",
                  fontSize: "0.9rem",
                }}
              />
            ))}

            <button
              onClick={handleSaveProfile}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                background: "#BFEAE6",
                color: "#3B3B3B",
                fontWeight: "600",
                border: "none",
                marginBottom: "0.5rem",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>

            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                background: "#3B3B3B",
                color: "#fff",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaSignOutAlt style={{ marginRight: "5px" }} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
