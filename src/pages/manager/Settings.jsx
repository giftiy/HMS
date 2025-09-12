// src/pages/ManagerSettings.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/manager/Sidebar";
import Navbar from "../../components/manager/Navbar";
import { FaUser, FaLock, FaBell, FaPalette } from "react-icons/fa";
import "./Settings.css"; // same css file

export default function ManagerSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [expanded, setExpanded] = useState(null);

  // Manager Profile
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    contact: "",
    photo: null,
  });

  // Account & Security
  const [account, setAccount] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    systemAlerts: true,
  });

  // Display & Theme
  const [display, setDisplay] = useState({
    primaryColor: "#0086ba",
    secondaryColor: "#00adef",
    layout: "default",
  });

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) setDarkMode(JSON.parse(savedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleChange = (e, section, file = false) => {
    const { name, value, files, type, checked } = e.target;
    const data = file ? files[0] : type === "checkbox" ? checked : value;

    switch (section) {
      case "profile":
        setProfile({ ...profile, [name]: data });
        break;
      case "account":
        setAccount({ ...account, [name]: data });
        break;
      case "notifications":
        setNotifications({ ...notifications, [name]: data });
        break;
      case "display":
        setDisplay({ ...display, [name]: data });
        break;
      default:
        break;
    }
  };

  const handleSave = (e, name) => {
    e.preventDefault();
    alert(`${name} saved successfully!`);
  };

  return (
    <div className={darkMode ? "settings-page dark" : "settings-page"}>
      <Navbar darkMode={darkMode} />
      <Sidebar />

      <div className="settings-content">
        <h2>Manager Settings</h2>
        <div className="dark-mode-toggle">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            Dark Mode
          </label>
        </div>

        {/* Sections */}
        <SettingsSection
          title="Profile"
          icon={<FaUser />}
          expanded={expanded === "profile"}
          toggle={() => toggleExpand("profile")}
        >
          <form onSubmit={(e) => handleSave(e, "Profile")}>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              placeholder="Full Name"
              onChange={(e) => handleChange(e, "profile")}
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              placeholder="Email"
              onChange={(e) => handleChange(e, "profile")}
            />
            <input
              type="text"
              name="contact"
              value={profile.contact}
              placeholder="Contact Number"
              onChange={(e) => handleChange(e, "profile")}
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => handleChange(e, "profile", true)}
            />
            {profile.photo && (
              <img
                src={URL.createObjectURL(profile.photo)}
                alt="Profile"
                className="preview-img"
              />
            )}
            <button type="submit">Save Profile</button>
          </form>
        </SettingsSection>

        <SettingsSection
          title="Account & Security"
          icon={<FaLock />}
          expanded={expanded === "account"}
          toggle={() => toggleExpand("account")}
        >
          <form onSubmit={(e) => handleSave(e, "Account")}>
            <input
              type="password"
              name="currentPassword"
              value={account.currentPassword}
              placeholder="Current Password"
              onChange={(e) => handleChange(e, "account")}
            />
            <input
              type="password"
              name="newPassword"
              value={account.newPassword}
              placeholder="New Password"
              onChange={(e) => handleChange(e, "account")}
            />
            <input
              type="password"
              name="confirmPassword"
              value={account.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => handleChange(e, "account")}
            />
            <label>
              <input
                type="checkbox"
                name="twoFactor"
                checked={account.twoFactor}
                onChange={(e) => handleChange(e, "account")}
              />
              Two-Factor Authentication
            </label>
            <button type="submit">Save Account</button>
          </form>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          icon={<FaBell />}
          expanded={expanded === "notifications"}
          toggle={() => toggleExpand("notifications")}
        >
          <form onSubmit={(e) => handleSave(e, "Notifications")}>
            <label>
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={(e) => handleChange(e, "notifications")}
              />
              Email Alerts
            </label>
            <label>
              <input
                type="checkbox"
                name="sms"
                checked={notifications.sms}
                onChange={(e) => handleChange(e, "notifications")}
              />
              SMS Alerts
            </label>
            <label>
              <input
                type="checkbox"
                name="systemAlerts"
                checked={notifications.systemAlerts}
                onChange={(e) => handleChange(e, "notifications")}
              />
              System Alerts
            </label>
            <button type="submit">Save Notifications</button>
          </form>
        </SettingsSection>

        <SettingsSection
          title="Display & Theme"
          icon={<FaPalette />}
          expanded={expanded === "display"}
          toggle={() => toggleExpand("display")}
        >
          <form onSubmit={(e) => handleSave(e, "Display & Theme")}>
            <label>Primary Color</label>
            <input
              type="color"
              name="primaryColor"
              value={display.primaryColor}
              onChange={(e) => handleChange(e, "display")}
            />
            <label>Secondary Color</label>
            <input
              type="color"
              name="secondaryColor"
              value={display.secondaryColor}
              onChange={(e) => handleChange(e, "display")}
            />
            <select
              name="layout"
              value={display.layout}
              onChange={(e) => handleChange(e, "display")}
            >
              <option value="default">Default Layout</option>
              <option value="compact">Compact Layout</option>
              <option value="wide">Wide Layout</option>
            </select>
            <button type="submit">Save Theme</button>
          </form>
        </SettingsSection>
      </div>
    </div>
  );
}

// Reusable Section Component
const SettingsSection = ({ title, icon, expanded, toggle, children }) => (
  <div className={`settings-section ${expanded ? "expanded" : ""}`}>
    <div className="section-header" onClick={toggle}>
      {icon} {title}
      <span className="expand-icon">{expanded ? "▲" : "▼"}</span>
    </div>
    {expanded && <div className="section-body">{children}</div>}
  </div>
);
