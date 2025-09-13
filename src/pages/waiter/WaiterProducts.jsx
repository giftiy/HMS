// src/pages/waiter/WaiterProduct.jsx
import React, { useState } from "react";
import Sidebar from "../../components/waiter/Sidebar";
import Navbar from "../../components/waiter/Navbar";

const sampleProducts = [
  { id: 1, name: "Pancakes", category: "Breakfast", price: 5.5, description: "Fluffy pancakes with syrup", image: "https://i.pinimg.com/736x/85/9a/de/859adef90e854238d9b330d0c7d2cf73.jpg" },
  { id: 2, name: "Omelette", category: "Breakfast", price: 4.5, description: "Egg omelette with cheese and veggies", image: "https://source.unsplash.com/200x120/?omelette" },
  { id: 3, name: "Burger", category: "Lunch", price: 8.0, description: "Beef burger with lettuce and tomato", image: "https://source.unsplash.com/200x120/?burger" },
  { id: 4, name: "Pizza", category: "Dinner", price: 10.0, description: "Cheese pizza with toppings", image: "https://source.unsplash.com/200x120/?pizza" },
  { id: 5, name: "Steak", category: "Dinner", price: 15.0, description: "Grilled steak cooked to perfection", image: "https://source.unsplash.com/200x120/?steak" },
  { id: 6, name: "Salad", category: "Lunch", price: 6.0, description: "Fresh garden salad", image: "https://source.unsplash.com/200x120/?salad" },
  { id: 7, name: "Ice Cream", category: "Dessert", price: 3.5, description: "Vanilla ice cream scoop", image: "https://source.unsplash.com/200x120/?ice-cream" },
  { id: 8, name: "Cake", category: "Dessert", price: 4.0, description: "Chocolate cake slice", image: "https://source.unsplash.com/200x120/?cake" },
  { id: 9, name: "Coffee", category: "Drink", price: 2.5, description: "Hot black coffee", image: "https://source.unsplash.com/200x120/?coffee" },
  { id: 10, name: "Coke", category: "Drink", price: 2.0, description: "Refreshing Coca-Cola", image: "https://source.unsplash.com/200x120/?coke" },
];

const tables = ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5"];

export default function WaiterProduct({ productsData = sampleProducts }) {
  const sidebarWidth = 220;

  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Drink"];

  const filteredProducts = (productsData || []).filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (product) => {
    setSelectedProducts((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const addSelectedToOrder = () => {
    if (!selectedProducts.length) return alert("Select products first!");
    const newOrder = [...order];
    filteredProducts
      .filter((p) => selectedProducts.includes(p.id))
      .forEach((product) => {
        const existing = newOrder.find((o) => o.id === product.id);
        if (existing) existing.quantity += 1;
        else newOrder.push({ ...product, quantity: 1 });
      });
    setOrder(newOrder);
    setSelectedProducts([]);
  };

  const removeFromOrder = (id) => setOrder(order.filter((o) => o.id !== id));
  const editQuantity = (id, qty) => { if (qty < 1) return; setOrder(order.map((o) => (o.id === id ? { ...o, quantity: qty } : o))); };
  const totalPrice = order.reduce((sum, o) => sum + o.price * o.quantity, 0);

  const submitOrder = () => {
    if (!selectedTable) return alert("Select a table first!");
    if (!order.length) return alert("Add products to order first!");
    console.log(`Order for ${selectedTable}:`, order);
    alert(`Order for ${selectedTable} submitted!`);
    setOrder([]);
    setSelectedTable("");
  };

  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#f4f6f9" },
    sidebarWrapper: { width: sidebarWidth, minHeight: "100vh", position: "fixed", top: 0, left: 0 },
    contentWrapper: { marginLeft: sidebarWidth, flex: 1, display: "flex", flexDirection: "column" },
    navbarWrapper: {
      position: "fixed",
      top: 0,
      left: sidebarWidth,
      right: 0,
      zIndex: 900,
      background: "#f4f6f9",
      borderBottom: "1px solid #e0e0e0",
    },
    mainPanel: { display: "flex", flex: 1, padding: "1rem 1.5rem 1.5rem 1.5rem", marginTop: "60px", gap: "1.5rem", overflowX: "auto" },
    productsPanel: { flex: 2, background: "#f4f6f9", borderRadius: 0, boxShadow: "none", padding: 0 },
    categoryBar: { display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" },
    categoryBtn: (active) => ({
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      background: active ? "#0086ba" : "#e0e0e0",
      color: active ? "#fff" : "#1e2a38",
      fontWeight: 600,
      fontSize: "0.85rem",
    }),
    productsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" },
    productCard: { background: "#fff", padding: "1rem", borderRadius: "8px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", cursor: "pointer" },
    productImage: { width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px", marginBottom: "0.5rem" },
    addSelectedBtn: { padding: "6px 12px", background: "#ff9800", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginBottom: "1rem", fontWeight: 600 },
    orderPanel: { flex: 1, background: "#f4f6f9", borderRadius: 0, boxShadow: "none", padding: "0.5rem", minWidth: "300px", display: "flex", flexDirection: "column" },
    tableSelect: { marginBottom: "1rem", padding: "6px", borderRadius: "6px", border: "1px solid #ccc" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { textAlign: "left", borderBottom: "1px solid #ddd", padding: "6px" },
    td: { borderBottom: "1px solid #eee", padding: "6px" },
    btnRemove: { padding: "4px 8px", background: "#FF4C4C", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
    submitBtn: { marginTop: "1rem", padding: "8px 16px", background: "#28a745", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 700 },
    qtyInput: { width: "50px", padding: "4px", textAlign: "center", borderRadius: "4px", border: "1px solid #ccc" },
    totalPrice: { fontWeight: 700, marginTop: "0.5rem", textAlign: "right" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebarWrapper}><Sidebar /></div>
      <div style={styles.contentWrapper}>
        <div style={styles.navbarWrapper}><Navbar /></div>
        <div style={styles.mainPanel}>
          {/* Products */}
          <div style={styles.productsPanel}>
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "8px", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }} />
            <div style={styles.categoryBar}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} style={styles.categoryBtn(category === cat)}>{cat}</button>
              ))}
            </div>
            <button style={styles.addSelectedBtn} onClick={addSelectedToOrder}>Add Selected to Order</button>
            <div style={styles.productsGrid}>
              {filteredProducts.map((p) => (
                <div key={p.id} style={{ ...styles.productCard, border: selectedProducts.includes(p.id) ? "2px solid #0086ba" : "2px solid transparent" }} onClick={() => toggleSelect(p)}>
                  <img src={p.image} alt={p.name} style={styles.productImage} />
                  <h4>{p.name}</h4>
                  <p><strong>{p.category}</strong></p>
                  <p>${p.price.toFixed(2)}</p>
                  <p style={{ fontSize: "0.85rem", color: "#555" }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Order */}
          <div style={styles.orderPanel}>
            <h3>Current Order</h3>
            <select style={styles.tableSelect} value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
              <option value="">Select Table</option>
              {tables.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>

            {order.length === 0 ? <p>No products in order</p> : (
              <>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Qty</th>
                      <th style={styles.th}>Price</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.map((o) => (
                      <tr key={o.id}>
                        <td style={styles.td}>{o.name}</td>
                        <td style={styles.td}><input type="number" min="1" style={styles.qtyInput} value={o.quantity} onChange={(e) => editQuantity(o.id, parseInt(e.target.value))} /></td>
                        <td style={styles.td}>${(o.price * o.quantity).toFixed(2)}</td>
                        <td style={styles.td}><button style={styles.btnRemove} onClick={() => removeFromOrder(o.id)}>Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</div>
                <button style={styles.submitBtn} onClick={submitOrder}>Submit Order</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
