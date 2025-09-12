// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { 
  FaUser, FaHotel, FaLock, FaBed, FaPalette, FaBell, FaCreditCard, FaGlobe 
} from "react-icons/fa";
import "./Settings.css"; // Separate CSS for professional styling

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [expanded, setExpanded] = useState(null);

  // General Profile State
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    role: "Administrator",
    nationalId: "",
    contact: "",
    photo: null,
  });

  // Hotel Info State
  const [hotelInfo, setHotelInfo] = useState({
    hotelName: "",
    logo: null,
    address: "",
    contact: "",
    email: "",
    checkIn: "14:00",
    checkOut: "12:00",
    currency: "USD",
    language: "English",
  });

  // Account & Security State
  const [account, setAccount] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
  });

  // Room & Services
  const [rooms, setRooms] = useState({
    defaultTypes: ["Single", "Double", "Suite"],
    amenities: { wifi: true, pool: true, gym: true, breakfast: true },
    serviceCharges: "",
  });

  // Display & Theme
  const [display, setDisplay] = useState({
    primaryColor: "#BFEAE6",
    secondaryColor: "#FFFAF2",
    layout: "default",
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    bookingAlerts: true,
  });

  // Payment & Billing
  const [payment, setPayment] = useState({
    defaultMethod: "Credit Card",
    invoiceTemplate: "",
    tax: "",
  });

  // Social & Marketing
  const [social, setSocial] = useState({
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    promoBanner: null,
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
      case "profile": setProfile({ ...profile, [name]: data }); break;
      case "hotelInfo": setHotelInfo({ ...hotelInfo, [name]: data }); break;
      case "account": setAccount({ ...account, [name]: data }); break;
      case "rooms": setRooms({ ...rooms, [name]: data }); break;
      case "display": setDisplay({ ...display, [name]: data }); break;
      case "notifications": setNotifications({ ...notifications, [name]: data }); break;
      case "payment": setPayment({ ...payment, [name]: data }); break;
      case "social": setSocial({ ...social, [name]: data }); break;
      default: break;
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
        <h2>Admin Settings</h2>
        <div className="dark-mode-toggle">
          <label>
            <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
            Dark Mode
          </label>
        </div>

        {/* Sections */}
        <SettingsSection
          title="General Profile"
          icon={<FaUser />}
          expanded={expanded === "profile"}
          toggle={() => toggleExpand("profile")}
        >
          <form onSubmit={(e) => handleSave(e, "Profile")}>
            <input type="text" name="fullName" value={profile.fullName} placeholder="Full Name" onChange={(e) => handleChange(e, "profile")} />
            <input type="email" name="email" value={profile.email} placeholder="Email" onChange={(e) => handleChange(e, "profile")} />
            <select name="role" value={profile.role} onChange={(e) => handleChange(e, "profile")}>
              <option>Administrator</option>
              <option>Manager</option>
              <option>Staff</option>
            </select>
            <input type="text" name="nationalId" value={profile.nationalId} placeholder="National / Employee ID" onChange={(e) => handleChange(e, "profile")} />
            <input type="text" name="contact" value={profile.contact} placeholder="Contact Number" onChange={(e) => handleChange(e, "profile")} />
            <input type="file" name="photo" accept="image/*" onChange={(e) => handleChange(e, "profile", true)} />
            {profile.photo && <img src={URL.createObjectURL(profile.photo)} alt="Profile" className="preview-img" />}
            <button type="submit">Save Profile</button>
          </form>
        </SettingsSection>

        <SettingsSection
          title="Hotel Information"
          icon={<FaHotel />}
          expanded={expanded === "hotelInfo"}
          toggle={() => toggleExpand("hotelInfo")}
        >
          <form onSubmit={(e) => handleSave(e, "Hotel Information")}>
            <input type="text" name="hotelName" value={hotelInfo.hotelName} placeholder="Hotel Name" onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="file" name="logo" accept="image/*" onChange={(e) => handleChange(e, "hotelInfo", true)} />
            <input type="text" name="address" value={hotelInfo.address} placeholder="Address" onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="text" name="contact" value={hotelInfo.contact} placeholder="Contact Number" onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="email" name="email" value={hotelInfo.email} placeholder="Email" onChange={(e) => handleChange(e, "hotelInfo")} />
            <button type="submit">Save Hotel Info</button>
          </form>
        </SettingsSection>

        <SettingsSection
          title="Account & Security"
          icon={<FaLock />}
          expanded={expanded === "account"}
          toggle={() => toggleExpand("account")}
        >
          <form onSubmit={(e) => handleSave(e, "Account")}>
            <input type="password" name="currentPassword" value={account.currentPassword} placeholder="Current Password" onChange={(e) => handleChange(e, "account")} />
            <input type="password" name="newPassword" value={account.newPassword} placeholder="New Password" onChange={(e) => handleChange(e, "account")} />
            <input type="password" name="confirmPassword" value={account.confirmPassword} placeholder="Confirm Password" onChange={(e) => handleChange(e, "account")} />
            <label>
              <input type="checkbox" name="twoFactor" checked={account.twoFactor} onChange={(e) => handleChange(e, "account")} />
              Two-Factor Authentication
            </label>
            <button type="submit">Save Account</button>
          </form>
        </SettingsSection>

        {/* Additional sections (Room & Services, Display, Notifications, Payment, Social/Marketing) */}
        {/* Use same SettingsSection component, form fields, icons */}
      </div>
    </div>
  );
}

// Reusable SettingsSection Component
const SettingsSection = ({ title, icon, expanded, toggle, children }) => (
  <div className={`settings-section ${expanded ? "expanded" : ""}`}>
    <div className="section-header" onClick={toggle}>
      {icon} {title}
      <span className="expand-icon">{expanded ? "▲" : "▼"}</span>
    </div>
    {expanded && <div className="section-body">{children}</div>}
  </div>
);
