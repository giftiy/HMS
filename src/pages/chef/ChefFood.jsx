import React, { useState } from "react";
import ChefNavbar from "../../components/chef/ChefNavbar";
import ChefSidebar from "../../components/chef/ChefSidebar";
import OrderNotification from "../../components/chef/OrderNotification";
import OrderCard from "../../components/chef/OrderCard";
import { FaBell, FaUtensils, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ChefFood() {
  const chefName = "Chef Gordon";

  // Foods with waiter & table info
  const [foods, setFoods] = useState([
    { id: 1, name: "Pizza", type: "Main Course", status: "Pending", waiter: "John", table: "Table 1" },
    { id: 2, name: "Burger", type: "Fast Food", status: "Pending", waiter: "Alice", table: "Table 2" },
    { id: 3, name: "Sandwich", type: "Snack", status: "Pending", waiter: "Mark", table: "Table 3" },
    { id: 4, name: "Pasta", type: "Main Course", status: "Pending", waiter: "John", table: "Table 1" },
  ]);

  // Notifications
  const [chefNotifications, setChefNotifications] = useState([]);
  const [waiterNotifications, setWaiterNotifications] = useState({}); // { waiterName: [{message, time}, ...] }

  // Mark food as completed
  const completeFood = (foodId) => {
    setFoods(prev =>
      prev.map(f =>
        f.id === foodId ? { ...f, status: "Completed", chef: chefName } : f
      )
    );

    const completedFood = foods.find(f => f.id === foodId);

    // Chef notification
    setChefNotifications(prev => [
      {
        id: Date.now(),
        message: `${completedFood.name} for ${completedFood.table} completed by ${chefName} (Waiter: ${completedFood.waiter})`,
        time: "Just now"
      },
      ...prev
    ]);

    // Waiter notification
    setWaiterNotifications(prev => {
      const waiter = completedFood.waiter;
      const newNotification = {
        id: Date.now(),
        message: `Your food order "${completedFood.name}" for ${completedFood.table} has been completed by ${chefName}`,
        time: "Just now"
      };
      return {
        ...prev,
        [waiter]: prev[waiter] ? [newNotification, ...prev[waiter]] : [newNotification]
      };
    });
  };

  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#f9fafb" },
    mainContent: { flex: 1, marginLeft: "220px", display: "flex", flexDirection: "column" },
    contentWrapper: { padding: "1.5rem", flex: 1 },
    header: { fontSize: "2rem", fontWeight: "700", marginBottom: "1.5rem", color: "#1e2a38", textAlign: "center" },
    cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", marginBottom: "2rem" },
    section: { background: "#fff", borderRadius: "12px", padding: "1.2rem", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", marginBottom: "2rem" },
    sectionTitle: { fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem", color: "#1e2a38" },
    itemList: { display: "grid", gap: "1rem" },
    itemBox: { background: "#f4f6f8", padding: "1rem", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    itemStatus: (status) => ({
      padding: "0.3rem 0.7rem",
      borderRadius: "6px",
      color: "#fff",
      backgroundColor: status === "Completed" ? "#4CAF50" : "#F44336",
      fontWeight: "600"
    }),
    completeBtn: {
      padding: "0.3rem 0.7rem",
      borderRadius: "6px",
      background: "#2196F3",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      marginLeft: "0.5rem"
    }
  };

  // Counts
  const availableCount = foods.filter(f => f.status !== "Completed").length;
  const completedCount = foods.filter(f => f.status === "Completed").length;
  const pendingCount = foods.filter(f => f.status === "Pending").length;
  const outOfStockCount = foods.filter(f => f.status === "Out of Stock").length;

  return (
    <div style={styles.container}>
      <ChefSidebar />
      <div style={styles.mainContent}>
        <ChefNavbar />
        <div style={styles.contentWrapper}>
          <h2 style={styles.header}>Chef Food Dashboard</h2>

          {/* Top Cards */}
          <div style={styles.cardGrid}>
            <OrderCard title="Available Foods" count={availableCount} icon={<FaUtensils />} color="linear-gradient(135deg, #81C784, #388E3C)" />
            <OrderCard title="Completed Orders" count={completedCount} icon={<FaCheckCircle />} color="linear-gradient(135deg, #64B5F6, #1976D2)" />
            <OrderCard title="Pending Orders" count={pendingCount} icon={<FaUtensils />} color="linear-gradient(135deg, #FFB74D, #F57C00)" />
            <OrderCard title="Out of Stock" count={outOfStockCount} icon={<FaTimesCircle />} color="linear-gradient(135deg, #E57373, #C62828)" />
          </div>

          {/* Notifications */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Notifications</h3>
            {chefNotifications.length ? chefNotifications.map(n => (
              <OrderNotification key={n.id} message={n.message} time={n.time} />
            )) : <p>No notifications yet</p>}
          </div>

          {/* Food List */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Food List</h3>
            <div style={styles.itemList}>
              {foods.map(f => (
                <div key={f.id} style={styles.itemBox}>
                  <div><strong>{f.name}</strong> — {f.type} | Table: {f.table} | Waiter: {f.waiter}</div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={styles.itemStatus(f.status)}>{f.status}</span>
                    {f.status !== "Completed" && (
                      <button style={styles.completeBtn} onClick={() => completeFood(f.id)}>
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
