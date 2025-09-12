// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { 
  FaUser, FaHotel, FaLock, FaBed, FaPalette, FaBell, FaCreditCard, FaGlobe 
} from "react-icons/fa";
import "./Settings.css"; 

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
        <SettingsSection title="General Profile" icon={<FaUser />} expanded={expanded === "profile"} toggle={() => toggleExpand("profile")}>
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

        <SettingsSection title="Hotel Information" icon={<FaHotel />} expanded={expanded === "hotelInfo"} toggle={() => toggleExpand("hotelInfo")}>
          <form onSubmit={(e) => handleSave(e, "Hotel Information")}>
            <input type="text" name="hotelName" value={hotelInfo.hotelName} placeholder="Hotel Name" onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="file" name="logo" accept="image/*" onChange={(e) => handleChange(e, "hotelInfo", true)} />
            <input type="text" name="address" value={hotelInfo.address} placeholder="Address" onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="text" name="contact" value={hotelInfo.contact} placeholder="Contact Number" onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="email" name="email" value={hotelInfo.email} placeholder="Email" onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="time" name="checkIn" value={hotelInfo.checkIn} onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="time" name="checkOut" value={hotelInfo.checkOut} onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="text" name="currency" value={hotelInfo.currency} onChange={(e) => handleChange(e, "hotelInfo")} />
            <input type="text" name="language" value={hotelInfo.language} onChange={(e) => handleChange(e, "hotelInfo")} />
            <button type="submit">Save Hotel Info</button>
          </form>
        </SettingsSection>

        <SettingsSection title="Account & Security" icon={<FaLock />} expanded={expanded === "account"} toggle={() => toggleExpand("account")}>
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

        <SettingsSection title="Room & Services" icon={<FaBed />} expanded={expanded === "rooms"} toggle={() => toggleExpand("rooms")}>
          <form onSubmit={(e) => handleSave(e, "Rooms & Services")}>
            <label>Default Room Types (comma separated)</label>
            <input type="text" name="defaultTypes" value={rooms.defaultTypes.join(",")} onChange={(e) => setRooms({ ...rooms, defaultTypes: e.target.value.split(",") })} />
            <label>Amenities</label>
            <label><input type="checkbox" name="wifi" checked={rooms.amenities.wifi} onChange={(e) => setRooms({ ...rooms, amenities: { ...rooms.amenities, wifi: e.target.checked } })} /> Wi-Fi</label>
            <label><input type="checkbox" name="pool" checked={rooms.amenities.pool} onChange={(e) => setRooms({ ...rooms, amenities: { ...rooms.amenities, pool: e.target.checked } })} /> Pool</label>
            <label><input type="checkbox" name="gym" checked={rooms.amenities.gym} onChange={(e) => setRooms({ ...rooms, amenities: { ...rooms.amenities, gym: e.target.checked } })} /> Gym</label>
            <label><input type="checkbox" name="breakfast" checked={rooms.amenities.breakfast} onChange={(e) => setRooms({ ...rooms, amenities: { ...rooms.amenities, breakfast: e.target.checked } })} /> Breakfast</label>
            <input type="text" name="serviceCharges" placeholder="Service Charges" value={rooms.serviceCharges} onChange={(e) => handleChange(e, "rooms")} />
            <button type="submit">Save Rooms</button>
          </form>
        </SettingsSection>

        <SettingsSection title="Display & Theme" icon={<FaPalette />} expanded={expanded === "display"} toggle={() => toggleExpand("display")}>
          <form onSubmit={(e) => handleSave(e, "Display & Theme")}>
            <label>Primary Color</label>
            <input type="color" name="primaryColor" value={display.primaryColor} onChange={(e) => handleChange(e, "display")} />
            <label>Secondary Color</label>
            <input type="color" name="secondaryColor" value={display.secondaryColor} onChange={(e) => handleChange(e, "display")} />
            <label>Layout</label>
            <select name="layout" value={display.layout} onChange={(e) => handleChange(e, "display")}>
              <option value="default">Default</option>
              <option value="compact">Compact</option>
              <option value="modern">Modern</option>
            </select>
            <button type="submit">Save Display</button>
          </form>
        </SettingsSection>

        <SettingsSection title="Notifications" icon={<FaBell />} expanded={expanded === "notifications"} toggle={() => toggleExpand("notifications")}>
          <form onSubmit={(e) => handleSave(e, "Notifications")}>
            <label><input type="checkbox" name="email" checked={notifications.email} onChange={(e) => handleChange(e, "notifications")} /> Email Alerts</label>
            <label><input type="checkbox" name="sms" checked={notifications.sms} onChange={(e) => handleChange(e, "notifications")} /> SMS Alerts</label>
            <label><input type="checkbox" name="bookingAlerts" checked={notifications.bookingAlerts} onChange={(e) => handleChange(e, "notifications")} /> Booking Alerts</label>
            <button type="submit">Save Notifications</button>
          </form>
        </SettingsSection>

        <SettingsSection title="Payment & Billing" icon={<FaCreditCard />} expanded={expanded === "payment"} toggle={() => toggleExpand("payment")}>
          <form onSubmit={(e) => handleSave(e, "Payment & Billing")}>
            <input type="text" name="defaultMethod" value={payment.defaultMethod} placeholder="Default Payment Method" onChange={(e) => handleChange(e, "payment")} />
            <input type="text" name="invoiceTemplate" value={payment.invoiceTemplate} placeholder="Invoice Template" onChange={(e) => handleChange(e, "payment")} />
            <input type="text" name="tax" value={payment.tax} placeholder="Tax (%)" onChange={(e) => handleChange(e, "payment")} />
            <button type="submit">Save Payment</button>
          </form>
        </SettingsSection>

        <SettingsSection title="Social & Marketing" icon={<FaGlobe />} expanded={expanded === "social"} toggle={() => toggleExpand("social")}>
          <form onSubmit={(e) => handleSave(e, "Social & Marketing")}>
            <input type="text" name="website" placeholder="Website" value={social.website} onChange={(e) => handleChange(e, "social")} />
            <input type="text" name="facebook" placeholder="Facebook" value={social.facebook} onChange={(e) => handleChange(e, "social")} />
            <input type="text" name="instagram" placeholder="Instagram" value={social.instagram} onChange={(e) => handleChange(e, "social")} />
            <input type="text" name="twitter" placeholder="Twitter" value={social.twitter} onChange={(e) => handleChange(e, "social")} />
            <input type="file" name="promoBanner" accept="image/*" onChange={(e) => handleChange(e, "social", true)} />
            <button type="submit">Save Social</button>
          </form>
        </SettingsSection>
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
