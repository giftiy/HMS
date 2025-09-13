// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import ReportsPage from "./pages/ReportsPage";
import NotificationsPage from "./pages/NotificationsPage";
import Settings from "./pages/Settings";

// Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerSettings from "./pages/manager/Settings";
import ManagerNotifications from "./pages/manager/Notifications";
import ProductManager from "./pages/manager/ProductManager";
import ManagerReports from "./pages/manager/Reports";

// Waiter Pages
import WaiterDashboard from "./pages/waiter/WaiterDashboard";
import WaiterOrders from "./pages/waiter/WaiterOrders";
import WaiterProducts from "./pages/waiter/WaiterProducts";
import WaiterProfile from "./pages/waiter/WaiterProfile";
import WaiterNotifications from "./pages/waiter/NotificationList";

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/employees" element={<EmployeeManagement />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<Settings />} />

      {/* Manager Routes */}
      <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      <Route path="/manager/settings" element={<ManagerSettings />} />
      <Route path="/manager/notifications" element={<ManagerNotifications />} />
      <Route path="/manager/products" element={<ProductManager />} />
      <Route path="/manager/reports" element={<ManagerReports />} />

      {/* Waiter Routes */}
      <Route path="/waiter/dashboard" element={<WaiterDashboard />} />
      <Route path="/waiter/orders" element={<WaiterOrders />} />
      <Route path="/waiter/products" element={<WaiterProducts />} />
      <Route path="/waiter/profile" element={<WaiterProfile />} />
      <Route path="/waiter/notifications" element={<WaiterNotifications />} />

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
