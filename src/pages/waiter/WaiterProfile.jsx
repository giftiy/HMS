// src/pages/waiter/WaiterSettings.jsx
import React, { useState } from "react";
import Sidebar from "../../components/waiter/Sidebar";
import Navbar from "../../components/waiter/Navbar";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaBell } from "react-icons/fa";

export default function WaiterSettings() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "waiter@example.com",
    phone: "+251912345678",
    password: "",
    shift: "Morning",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setProfile({ ...profile, [name]: checked });
    else setProfile({ ...profile, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  const sidebarWidth = 220;

  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#f4f6f9" },
    sidebarWrapper: { width: sidebarWidth, position: "fixed", top: 0, left: 0, height: "100%" },
    mainContent: { marginLeft: sidebarWidth, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" },
    navbarWrapper: { position: "sticky", top: 0, zIndex: 50 },
    innerContainer: { padding: "2rem", width: "100%", maxWidth: "900px", margin: "0 auto", flex: 1 },
    header: { fontSize: "2.2rem", fontWeight: 700, marginBottom: "2rem", textAlign: "center", color: "#1e2a38" },
    card: { background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", marginBottom: "2rem" },
    formGroup: { display: "flex", flexDirection: "column", gap: "1rem" },
    inputGroup: { display: "flex", alignItems: "center", gap: "0.5rem" },
    input: { flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem", outline: "none" },
    button: { padding: "12px", background: "#0086ba", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, marginTop: "1rem" },
    toggleContainer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" },
    label: { fontWeight: 600, color: "#1e2a38" },
    footer: { marginTop: "auto", padding: "1rem", textAlign: "center", fontSize: "0.85rem", color: "#888" },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebarWrapper}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Navbar */}
        <div style={styles.navbarWrapper}>
          <Navbar />
        </div>

        {/* Settings Content */}
        <div style={styles.innerContainer}>
          <h2 style={styles.header}>Waiter Settings</h2>

          <div style={styles.card}>
            <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>Profile</h3>
            <form onSubmit={handleSave} style={styles.formGroup}>
              <div style={styles.inputGroup}>
                <FaUser color="#0086ba" />
                <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <FaEnvelope color="#0086ba" />
                <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <FaPhone color="#0086ba" />
                <input type="tel" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone Number" style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <FaLock color="#0086ba" />
                <input type="password" name="password" value={profile.password} onChange={handleChange} placeholder="New Password" style={styles.input} />
              </div>

              <div style={{ marginTop: "1rem" }}>
                <label style={styles.label}>Shift</label>
                <select name="shift" value={profile.shift} onChange={handleChange} style={{ ...styles.input, marginTop: "0.5rem" }}>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Night</option>
                </select>
              </div>

              <div style={styles.toggleContainer}>
                <span style={styles.label}><FaBell /> Notifications</span>
                <input type="checkbox" name="notifications" checked={profile.notifications} onChange={handleChange} />
              </div>

              <button style={styles.button} type="submit">Save Changes</button>
            </form>
          </div>

          <div style={styles.footer}>© 2025 Soreti Cafe. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
