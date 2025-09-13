import React, { useState } from "react";
import ChefNavbar from "../../components/chef/ChefNavbar";
import ChefSidebar from "../../components/chef/ChefSidebar";
import OrderNotification from "../../components/chef/OrderNotification";
import OrderCard from "../../components/chef/OrderCard";
import { FaBell, FaCoffee, FaCocktail, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ChefDrink() {
  const chefName = "Chef Gordon";

  // Mock drinks data with waiter & table info
  const [drinks, setDrinks] = useState([
    { id: 1, name: "Coke", type: "Soft Drink", status: "Pending", waiter: "John", table: "Table 1" },
    { id: 2, name: "Coffee", type: "Hot Drink", status: "Pending", waiter: "Alice", table: "Table 2" },
    { id: 3, name: "Orange Juice", type: "Cold Drink", status: "Pending", waiter: "Mark", table: "Table 3" },
    { id: 4, name: "Cocktail", type: "Alcoholic", status: "Pending", waiter: "John", table: "Table 1" },
  ]);

  // Notifications for Chef
  const [chefNotifications, setChefNotifications] = useState([]);

  // Notifications per waiter
  const [waiterNotifications, setWaiterNotifications] = useState({}); // { waiterName: [{message, time}, ...] }

  // Complete drink/order
  const completeDrink = (drinkId) => {
    setDrinks(prev =>
      prev.map(d =>
        d.id === drinkId ? { ...d, status: "Completed", chef: chefName } : d
      )
    );

    const completedDrink = drinks.find(d => d.id === drinkId);

    // Chef notification
    setChefNotifications(prev => [
      {
        id: Date.now(),
        message: `${completedDrink.name} for ${completedDrink.table} completed by ${chefName} (Waiter: ${completedDrink.waiter})`,
        time: "Just now"
      },
      ...prev
    ]);

    // Waiter notification
    setWaiterNotifications(prev => {
      const waiter = completedDrink.waiter;
      const newNotification = {
        id: Date.now(),
        message: `Your drink order "${completedDrink.name}" for ${completedDrink.table} has been completed by ${chefName}`,
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
    drinkList: { display: "grid", gap: "1rem" },
    drinkBox: { background: "#f4f6f8", padding: "1rem", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    drinkStatus: (status) => ({
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

  // Counts for cards
  const availableCount = drinks.filter(d => d.status !== "Completed").length;
  const completedCount = drinks.filter(d => d.status === "Completed").length;
  const pendingCount = drinks.filter(d => d.status === "Pending").length;
  const outOfStockCount = drinks.filter(d => d.status === "Out of Stock").length;

  return (
    <div style={styles.container}>
      <ChefSidebar />
      <div style={styles.mainContent}>
        <ChefNavbar />
        <div style={styles.contentWrapper}>
          <h2 style={styles.header}>Chef Drinks Dashboard</h2>

          {/* Top Cards */}
          <div style={styles.cardGrid}>
            <OrderCard title="Available Drinks" count={availableCount} icon={<FaCoffee />} color="linear-gradient(135deg, #81C784, #388E3C)" />
            <OrderCard title="Completed Orders" count={completedCount} icon={<FaCheckCircle />} color="linear-gradient(135deg, #64B5F6, #1976D2)" />
            <OrderCard title="Pending Orders" count={pendingCount} icon={<FaCocktail />} color="linear-gradient(135deg, #FFB74D, #F57C00)" />
            <OrderCard title="Out of Stock" count={outOfStockCount} icon={<FaTimesCircle />} color="linear-gradient(135deg, #E57373, #C62828)" />
          </div>

          {/* Notifications */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Notifications</h3>
            {chefNotifications.length ? (
              chefNotifications.map(n => (
                <OrderNotification key={n.id} message={n.message} time={n.time} />
              ))
            ) : (
              <p>No notifications yet</p>
            )}
          </div>

          {/* Drink List */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Drink List</h3>
            <div style={styles.drinkList}>
              {drinks.map(d => (
                <div key={d.id} style={styles.drinkBox}>
                  <div>
                    <strong>{d.name}</strong> — {d.type} | Table: {d.table} | Waiter: {d.waiter}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={styles.drinkStatus(d.status)}>{d.status}</span>
                    {d.status !== "Completed" && (
                      <button style={styles.completeBtn} onClick={() => completeDrink(d.id)}>
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
