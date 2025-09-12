// src/pages/manager/ProductManager.jsx
import React, { useState } from "react";
import Sidebar from "../../components/manager/Sidebar";
import Navbar from "../../components/manager/Navbar";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quality: "",
    currency: "ETB",
    cbeName: "",
    cbeNumber: "",
    awashName: "",
    awashNumber: "",
    teleBirrName: "",
    teleBirrNumber: "",
    coopName: "",
    coopNumber: "",
    image: null,
  });
  const [viewProduct, setViewProduct] = useState(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewProduct({ ...newProduct, [name]: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      quality: "",
      currency: "ETB",
      cbeName: "",
      cbeNumber: "",
      awashName: "",
      awashNumber: "",
      teleBirrName: "",
      teleBirrNumber: "",
      coopName: "",
      coopNumber: "",
      image: null,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleAddOrEditProduct = (e) => {
    e.preventDefault();
    const { name, description, price, quality, cbeName, cbeNumber } = newProduct;
    if (!name || !description || !price || !quality || !cbeName || !cbeNumber) {
      return alert("Please fill all required fields!");
    }

    if (editingProduct) {
      // Edit product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...editingProduct, ...newProduct, price: Number(newProduct.price) } : p
        )
      );
    } else {
      // Add product
      const id = products.length ? products[products.length - 1].id + 1 : 1;
      setProducts([...products, { id, ...newProduct, price: Number(newProduct.price) }]);
    }

    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleViewProduct = (product) => {
    setViewProduct(product);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
    setShowForm(true);
  };

  // Modal styles
  const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "1rem",
  };

  const modalCard = {
    background: "#fff",
    borderRadius: "12px",
    width: "420px",
    maxHeight: "80vh",
    overflowY: "auto",
    padding: "1rem",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const imageSmall = {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
      {/* Sidebar */}
      <div style={{ width: "240px", position: "fixed", top: 0, bottom: 0, background: "#fff", boxShadow: "2px 0 8px rgba(0,0,0,0.05)" }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <div style={{ position: "fixed", top: 0, left: "240px", right: 0, height: "60px", zIndex: 1000, background: "#0086ba" }}>
          <Navbar />
        </div>

        {/* Page Content */}
        <div style={{ padding: "2rem", marginTop: "60px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#1e2a38" }}>Product Management</h2>

          {/* Search + Add Button */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", flexGrow: 1, minWidth: "200px" }}
            />
            <button onClick={() => { resetForm(); setShowForm(true); }} style={{ padding: "8px 16px", background: "#0086ba", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              + {editingProduct ? "Edit Product" : "Add Product"}
            </button>
          </div>

          {/* Product Table */}
          <div style={{ overflowX: "auto", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
              <thead style={{ background: "#0086ba", color: "#fff" }}>
                <tr>
                  <th style={{ padding: "0.5rem" }}>ID</th>
                  <th style={{ padding: "0.5rem" }}>Name</th>
                  <th style={{ padding: "0.5rem" }}>Price</th>
                  <th style={{ padding: "0.5rem" }}>Quality</th>
                  <th style={{ padding: "0.5rem" }}>Currency</th>
                  <th style={{ padding: "0.5rem" }}>Image</th>
                  <th style={{ padding: "0.5rem" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quality}</td>
                    <td>{p.currency}</td>
                    <td>{p.image && <img src={p.image instanceof File ? URL.createObjectURL(p.image) : p.image} alt={p.name} style={imageSmall} />}</td>
                    <td style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                      <button onClick={() => handleViewProduct(p)} style={{ padding: "5px 8px", background: "#17a2b8", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>View</button>
                      <button onClick={() => handleEditProduct(p)} style={{ padding: "5px 8px", background: "#ffc107", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete(p.id)} style={{ padding: "5px 8px", background: "#FF4C4C", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add/Edit Product Modal */}
          {showForm && (
            <div style={modalOverlay}>
              <form style={modalCard} onSubmit={handleAddOrEditProduct}>
                <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} required />
                <input type="text" name="quality" placeholder="Quality" value={newProduct.quality} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required />
                <input type="text" name="currency" placeholder="Currency" value={newProduct.currency} onChange={handleChange} required />

                <h4 style={{ marginTop: "0.5rem" }}>Payment Accounts</h4>
                <input type="text" name="cbeName" placeholder="CBE Account Name" value={newProduct.cbeName} onChange={handleChange} required />
                <input type="text" name="cbeNumber" placeholder="CBE Account Number" value={newProduct.cbeNumber} onChange={handleChange} required />
                <input type="text" name="awashName" placeholder="Awash Account Name" value={newProduct.awashName} onChange={handleChange} />
                <input type="text" name="awashNumber" placeholder="Awash Account Number" value={newProduct.awashNumber} onChange={handleChange} />
                <input type="text" name="teleBirrName" placeholder="TeleBirr Account Name" value={newProduct.teleBirrName} onChange={handleChange} />
                <input type="text" name="teleBirrNumber" placeholder="TeleBirr Account Number" value={newProduct.teleBirrNumber} onChange={handleChange} />
                <input type="text" name="coopName" placeholder="Coop Account Name" value={newProduct.coopName} onChange={handleChange} />
                <input type="text" name="coopNumber" placeholder="Coop Account Number" value={newProduct.coopNumber} onChange={handleChange} />

                <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} required style={{ resize: "vertical", minHeight: "60px" }} />
                <input type="file" name="image" accept="image/*" onChange={handleChange} />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                  <button type="button" onClick={resetForm} style={{ padding: "6px 10px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
                  <button type="submit" style={{ padding: "6px 10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>{editingProduct ? "Update" : "Add Product"}</button>
                </div>
              </form>
            </div>
          )}

          {/* View Product Modal */}
          {viewProduct && (
            <div style={modalOverlay}>
              <div style={modalCard}>
                <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Product Details</h3>
                {viewProduct.image && <img src={viewProduct.image instanceof File ? URL.createObjectURL(viewProduct.image) : viewProduct.image} alt={viewProduct.name} style={imageSmall} />}
                <p><strong>Name:</strong> {viewProduct.name}</p>
                <p><strong>Description:</strong> {viewProduct.description}</p>
                <p><strong>Price:</strong> {viewProduct.price}</p>
                <p><strong>Quality:</strong> {viewProduct.quality}</p>
                <p><strong>Currency:</strong> {viewProduct.currency}</p>
                <p><strong>CBE Account Name:</strong> {viewProduct.cbeName}</p>
                <p><strong>CBE Account Number:</strong> {viewProduct.cbeNumber}</p>
                <p><strong>Awash Account Name:</strong> {viewProduct.awashName}</p>
                <p><strong>Awash Account Number:</strong> {viewProduct.awashNumber}</p>
                <p><strong>TeleBirr Account Name:</strong> {viewProduct.teleBirrName}</p>
                <p><strong>TeleBirr Account Number:</strong> {viewProduct.teleBirrNumber}</p>
                <p><strong>Coop Account Name:</strong> {viewProduct.coopName}</p>
                <p><strong>Coop Account Number:</strong> {viewProduct.coopNumber}</p>
                <button onClick={() => setViewProduct(null)} style={{ padding: "6px 10px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "0.5rem" }}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
