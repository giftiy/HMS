// src/pages/cashier/Settings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/cashier/Sidebar";
import Navbar from "../../components/cashier/Navbar";
import { FaCamera, FaSignOutAlt } from "react-icons/fa";

export default function Settings({ role = "Cashier" }) {
  const navigate = useNavigate();

  // Load profile data from localStorage
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(`${role.toLowerCase()}Data`);
    return saved
      ? JSON.parse(saved)
      : {
          name: `${role} User`,
          email: `${role.toLowerCase()}@soreti.com`,
          password: "",
          confirmPassword: "",
          photo: "",
        };
  });

  const saveProfile = (data) => {
    localStorage.setItem(`${role.toLowerCase()}Data`, JSON.stringify(data));
    setProfile(data);
  };

  const handleChange = (field, value) => saveProfile({ ...profile, [field]: value });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => saveProfile({ ...profile, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (profile.password && profile.password !== profile.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    saveProfile({ ...profile, password: "", confirmPassword: "" });
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(`/${role.toLowerCase()}/login`);
  };

  const styles = {
    container: { display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f4f6f9", fontFamily: "Arial, sans-serif" },
    navbarWrapper: { height: "60px", flexShrink: 0 },
    bodyWrapper: { display: "flex", flex: 1 },
    sidebarWrapper: { width: "220px" },
    mainContent: { flex: 1, padding: "2rem" },
    header: { fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem", color: "#1e2a38", textAlign: "center" },
    profileBox: { background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", maxWidth: "500px", margin: "0 auto" },
    avatarWrapper: { position: "relative", display: "inline-block", marginBottom: "1rem" },
    avatar: { width: "100px", height: "100px", borderRadius: "50%", border: "2px solid #BFEAE6" },
    cameraLabel: { position: "absolute", bottom: 0, right: 0, background: "#3B3B3B", color: "#fff", borderRadius: "50%", padding: "5px", cursor: "pointer", border: "1px solid #FFF7F0" },
    input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "0.5rem", background: "#FFF7F2", color: "#3B3B3B", outline: "none", fontSize: "0.9rem" },
    saveBtn: { width: "100%", padding: "10px", borderRadius: "6px", background: "#BFEAE6", color: "#3B3B3B", fontWeight: "600", border: "none", marginBottom: "0.5rem", cursor: "pointer" },
    logoutBtn: { width: "100%", padding: "10px", borderRadius: "6px", background: "#3B3B3B", color: "#fff", fontWeight: "600", border: "none", cursor: "pointer" },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbarWrapper}>
        <Navbar />
      </div>

      {/* Body: Sidebar + Main */}
      <div style={styles.bodyWrapper}>
        {/* Sidebar */}
        <div style={styles.sidebarWrapper}>
          <Sidebar role={role} />
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <h2 style={styles.header}>{role} Settings</h2>

          <div style={styles.profileBox}>
            <div style={{ textAlign: "center" }}>
              <div style={styles.avatarWrapper}>
                <img src={profile.photo || "/default-avatar.png"} alt="Profile" style={styles.avatar} />
                <label htmlFor="photoUpload" style={styles.cameraLabel}><FaCamera size={16} /></label>
                <input type="file" id="photoUpload" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              </div>
              <h3 style={{ margin: "0.5rem 0 0.25rem", fontWeight: "600" }}>{profile.name}</h3>
              <p style={{ margin: 0, color: "#555", fontSize: "0.85rem" }}>{profile.email}</p>
            </div>

            {["name", "email", "password", "confirmPassword"].map((field) => (
              <input
                key={field}
                type={field.includes("password") ? "password" : "text"}
                value={profile[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                style={styles.input}
              />
            ))}

            <button style={styles.saveBtn} onClick={handleSaveProfile}>Save Changes</button>
            <button style={styles.logoutBtn} onClick={handleLogout}><FaSignOutAlt style={{ marginRight: "5px" }} /> Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
