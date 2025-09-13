// src/pages/waiter/WaiterOrders.jsx
import React, { useState } from "react";
import Sidebar from "../../components/waiter/Sidebar";
import Navbar from "../../components/waiter/Navbar";
import { FaClipboardList, FaUtensils, FaDollarSign, FaBell } from "react-icons/fa";

export default function WaiterOrders() {
  const [orders, setOrders] = useState([
    { id: 1, table: 5, items: [{ name: "Coffee", quantity: 2, price: 10 }, { name: "Cake", quantity: 1, price: 30 }], status: "Pending" },
    { id: 2, table: 2, items: [{ name: "Sandwich", quantity: 1, price: 25 }], status: "Completed" },
    { id: 3, table: 3, items: [{ name: "Pizza", quantity: 1, price: 40 }, { name: "Juice", quantity: 2, price: 10 }], status: "Pending" },
  ]);

  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0), 0);

  const updateStatus = (id, status) => {
    setOrders(orders.map(o => (o.id === id ? { ...o, status } : o)));
  };

  const editItemQty = (orderId, itemName, qty) => {
    if (qty < 1) return;
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return { ...o, items: o.items.map(i => i.name === itemName ? { ...i, quantity: qty } : i) };
      }
      return o;
    }));
  };

  const removeItem = (orderId, itemName) => {
    setOrders(
      orders
        .map(o => {
          if (o.id === orderId) {
            return { ...o, items: o.items.filter(i => i.name !== itemName) };
          }
          return o;
        })
        .filter(o => o.items.length > 0)
    );
  };

  const sidebarWidth = 220;

  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#f4f6f9", flexDirection: "column" },
    navbarWrapper: { width: "100%", zIndex: 50, position: "fixed", top: 0 },
    contentWrapper: { display: "flex", marginTop: "60px", flex: 1 }, // 60px navbar height
    sidebarWrapper: { width: sidebarWidth, flexShrink: 0 },
    mainContent: { flex: 1, padding: "2rem" },
    header: { fontSize: "2.2rem", fontWeight: 700, marginBottom: "2rem", textAlign: "center", color: "#1e2a38" },
    cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem", marginBottom: "2.5rem" },
    card: { background: "#fff", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", textAlign: "center" },
    cardIcon: { fontSize: "1.5rem", marginBottom: "0.5rem", color: "#0086ba" },
    cardTitle: { marginBottom: "0.5rem", fontWeight: 600 },
    cardValue: { fontSize: "1.5rem", fontWeight: 700, color: "#0086ba" },
    sectionBox: { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
    sectionTitle: { marginBottom: "1.5rem", color: "#1e2a38", fontSize: "1.5rem", fontWeight: "600", textAlign: "center" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { padding: "0.75rem", textAlign: "left", backgroundColor: "#e0f0ff", color: "#1e2a38" },
    td: { padding: "0.75rem", borderBottom: "1px solid #eee", verticalAlign: "middle" },
    badgePending: { padding: "0.3rem 0.6rem", borderRadius: "5px", color: "#fff", backgroundColor: "#FF9800", fontSize: "0.85rem" },
    badgeCompleted: { padding: "0.3rem 0.6rem", borderRadius: "5px", color: "#fff", backgroundColor: "#4CAF50", fontSize: "0.85rem" },
    actionBtn: { padding: "5px 12px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "5px" },
    removeBtn: { padding: "5px 12px", background: "#FF4C4C", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginLeft: "5px" },
    qtyInput: { width: "50px", padding: "4px", borderRadius: "4px", border: "1px solid #ccc", textAlign: "center", marginRight: "5px" },
  };

  return (
    <div style={styles.container}>
      {/* Navbar on top of sidebar */}
      <div style={styles.navbarWrapper}><Navbar /></div>

      {/* Content */}
      <div style={styles.contentWrapper}>
        {/* Sidebar */}
        <div style={styles.sidebarWrapper}><Sidebar /></div>

        {/* Main */}
        <div style={styles.mainContent}>
          <h2 style={styles.header}>Waiter Orders</h2>

          {/* Stats Cards */}
          <div style={styles.cardGrid}>
            <div style={styles.card}><FaClipboardList style={styles.cardIcon} /><div style={styles.cardTitle}>Pending Orders</div><div style={styles.cardValue}>{pendingOrders}</div></div>
            <div style={styles.card}><FaUtensils style={styles.cardIcon} /><div style={styles.cardTitle}>Completed Orders</div><div style={styles.cardValue}>{completedOrders}</div></div>
            <div style={styles.card}><FaDollarSign style={styles.cardIcon} /><div style={styles.cardTitle}>Total Revenue</div><div style={styles.cardValue}>{totalRevenue} ETB</div></div>
            <div style={styles.card}><FaBell style={styles.cardIcon} /><div style={styles.cardTitle}>Notifications</div><div style={styles.cardValue}>0</div></div>
          </div>

          {/* Orders Table */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>Orders</h3>
            {orders.length === 0 ? (
              <p style={{ color: "#888", textAlign: "center" }}>No orders yet.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Table</th>
                    <th style={styles.th}>Items</th>
                    <th style={styles.th}>Total</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const orderTotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
                    return (
                      <tr key={order.id}>
                        <td style={styles.td}>#{order.id}</td>
                        <td style={styles.td}>{order.table}</td>
                        <td style={styles.td}>
                          {order.items.map(item => (
                            <div key={item.name} style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
                              <span style={{ flex: 1 }}>{item.name}</span>
                              <input type="number" min="1" value={item.quantity} style={styles.qtyInput} onChange={(e) => editItemQty(order.id, item.name, parseInt(e.target.value))} />
                              <button style={styles.removeBtn} onClick={() => removeItem(order.id, item.name)}>Remove</button>
                            </div>
                          ))}
                        </td>
                        <td style={styles.td}>{orderTotal} ETB</td>
                        <td style={styles.td}>
                          <span style={order.status === "Pending" ? styles.badgePending : styles.badgeCompleted}>{order.status}</span>
                        </td>
                        <td style={styles.td}>
                          {order.status === "Pending" && (
                            <button style={styles.actionBtn} onClick={() => updateStatus(order.id, "Completed")}>Mark Completed</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
