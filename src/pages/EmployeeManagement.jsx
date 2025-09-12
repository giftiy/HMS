import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  const [viewEmployee, setViewEmployee] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    fullName: "",
    role: "MANAGER",
    phone: "",
    email: "",
    password: "",
    active: true,
    profileImage: null,
    nationalIdImage: null,
  });

  // Filter employees by search
  useEffect(() => {
    setFilteredEmployees(
      employees
        .filter((emp) =>
          emp.fullName.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
    );
  }, [search, employees]);

  // Handle input changes for add/edit
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (showEdit) setEditEmployee({ ...editEmployee, [name]: files[0] });
      else setNewEmployee({ ...newEmployee, [name]: files[0] });
    } else {
      if (showEdit) setEditEmployee({ ...editEmployee, [name]: value });
      else setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  // Add employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const id = Date.now(); // simple unique ID
    setEmployees([...employees, { ...newEmployee, id }]);
    setShowForm(false);
    setNewEmployee({
      fullName: "",
      role: "MANAGER",
      phone: "",
      email: "",
      password: "",
      active: true,
      profileImage: null,
      nationalIdImage: null,
    });
  };

  // Edit employee
  const handleEditEmployee = (emp) => {
    setEditEmployee({ ...emp });
    setShowEdit(true);
  };

  // Update employee
  const handleUpdateEmployeeSubmit = (e) => {
    e.preventDefault();
    setEmployees(
      employees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
    );
    setShowEdit(false);
    setEditEmployee(null);
  };

  // Delete employee
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // View employee
  const handleViewEmployee = (emp) => {
    setViewEmployee(emp);
    setShowView(true);
  };

  // Modal common styles
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
  };

  const modalCard = {
    background: "#fff",
    borderRadius: "12px",
    width: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "1.5rem",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  };

  const imageSmall = { width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" };
  const imageNational = { width: "120px", height: "70px", objectFit: "cover", borderRadius: "6px" };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "1.5rem", background: "#f4f6f9", minHeight: "100vh" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: "1rem" }}>Employee Management</h2>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", width: "250px" }}
          />
          <button
            onClick={() => setShowForm(true)}
            style={{ padding: "8px 16px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            + Add Employee
          </button>
        </div>

        {/* Employee Table */}
        <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#2196F3", color: "#fff" }}>
              <tr>
                <th style={{ padding: "10px" }}>NO</th>
                <th style={{ padding: "10px" }}>Photo</th>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Role</th>
                <th style={{ padding: "10px" }}>Email</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, idx) => (
                <tr key={emp.id} style={{ background: idx % 2 === 0 ? "#f9f9f9" : "#fff", textAlign: "center" }}>
                  <td>{idx + 1}</td>
                  <td>
                    {emp.profileImage ? (
                      <img
                        src={emp.profileImage instanceof File ? URL.createObjectURL(emp.profileImage) : emp.profileImage}
                        alt="Profile"
                        style={imageSmall}
                      />
                    ) : (
                      <div style={{ ...imageSmall, background: "#ccc" }} />
                    )}
                  </td>
                  <td>{emp.fullName}</td>
                  <td>{emp.role}</td>
                  <td>{emp.email}</td>
                  <td style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                    <button onClick={() => handleViewEmployee(emp)} style={{ padding: "6px 12px", background: "#17a2b8", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>View</button>
                    <button onClick={() => handleEditEmployee(emp)} style={{ padding: "6px 12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => handleDelete(emp.id)} style={{ padding: "6px 12px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Employee Modal */}
        {showForm && (
          <div style={modalOverlay}>
            <form onSubmit={handleAddEmployee} style={modalCard}>
              <h3 style={{ textAlign: "center" }}>Add Employee</h3>
              <input type="text" name="fullName" placeholder="Full Name" value={newEmployee.fullName} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone" value={newEmployee.phone} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={newEmployee.password} onChange={handleChange} required />
              <select name="role" value={newEmployee.role} onChange={handleChange} required>
                <option value="MANAGER">Manager</option>
                <option value="CHEFF_FOOD">Chef Food</option>
                <option value="CHEFF_DRINK">Chef Drink</option>
                <option value="CHEFF_SNACK">Chef Snack</option>
                <option value="WAITER">Waiter</option>
                <option value="CASHIER">Cashier</option>
                <option value="HOUSEKEEPS">Housekeeping</option>
                <option value="CHAIR">Chair</option>
              </select>
              <label>Active:</label>
              <select name="active" value={newEmployee.active} onChange={(e) => setNewEmployee({ ...newEmployee, active: e.target.value === "true" })}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <label>Profile Image:</label>
              <input type="file" name="profileImage" onChange={handleChange} accept="image/*" />
              {newEmployee.profileImage && <img src={URL.createObjectURL(newEmployee.profileImage)} alt="Profile" style={imageSmall} />}
              <label>National ID Image:</label>
              <input type="file" name="nationalIdImage" onChange={handleChange} accept="image/*" />
              {newEmployee.nationalIdImage && <img src={URL.createObjectURL(newEmployee.nationalIdImage)} alt="National ID" style={imageNational} />}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.8rem" }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ padding: "8px 16px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ padding: "8px 16px", background: "#28a745", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Add</button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Employee Modal */}
        {showEdit && editEmployee && (
          <div style={modalOverlay}>
            <form onSubmit={handleUpdateEmployeeSubmit} style={modalCard}>
              <h3 style={{ textAlign: "center" }}>Edit Employee</h3>
              <input type="text" name="fullName" placeholder="Full Name" value={editEmployee.fullName} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={editEmployee.email} onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone" value={editEmployee.phone} onChange={handleChange} required />
              <select name="role" value={editEmployee.role} onChange={handleChange} required>
                <option value="MANAGER">Manager</option>
                <option value="CHEFF_FOOD">Chef Food</option>
                <option value="CHEFF_DRINK">Chef Drink</option>
                <option value="CHEFF_SNACK">Chef Snack</option>
                <option value="WAITER">Waiter</option>
                <option value="CASHIER">Cashier</option>
                <option value="HOUSEKEEPS">Housekeeping</option>
                <option value="CHAIR">Chair</option>
              </select>
              <label>Active:</label>
              <select name="active" value={editEmployee.active} onChange={(e) => setEditEmployee({ ...editEmployee, active: e.target.value === "true" })}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <label>Profile Image:</label>
              <input type="file" name="profileImage" onChange={handleChange} accept="image/*" />
              {editEmployee.profileImage && <img src={editEmployee.profileImage instanceof File ? URL.createObjectURL(editEmployee.profileImage) : editEmployee.profileImage} alt="Profile" style={imageSmall} />}
              <label>National ID Image:</label>
              <input type="file" name="nationalIdImage" onChange={handleChange} accept="image/*" />
              {editEmployee.nationalIdImage && <img src={editEmployee.nationalIdImage instanceof File ? URL.createObjectURL(editEmployee.nationalIdImage) : editEmployee.nationalIdImage} alt="National ID" style={imageNational} />}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.8rem" }}>
                <button type="button" onClick={() => setShowEdit(false)} style={{ padding: "8px 16px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Update</button>
              </div>
            </form>
          </div>
        )}

        {/* View Employee Modal */}
        {showView && viewEmployee && (
          <div style={modalOverlay}>
            <div style={modalCard}>
              <h3 style={{ textAlign: "center" }}>Employee Details</h3>
              {viewEmployee.profileImage && (
                <img
                  src={viewEmployee.profileImage instanceof File ? URL.createObjectURL(viewEmployee.profileImage) : viewEmployee.profileImage}
                  alt="Profile"
                  style={imageSmall}
                />
              )}
              <p><strong>Name:</strong> {viewEmployee.fullName}</p>
              <p><strong>Email:</strong> {viewEmployee.email}</p>
              <p><strong>Phone:</strong> {viewEmployee.phone}</p>
              <p><strong>Role:</strong> {viewEmployee.role}</p>
              <p><strong>Status:</strong> {viewEmployee.active ? "Active" : "Inactive"}</p>
              {viewEmployee.nationalIdImage && (
                <img
                  src={viewEmployee.nationalIdImage instanceof File ? URL.createObjectURL(viewEmployee.nationalIdImage) : viewEmployee.nationalIdImage}
                  alt="National ID"
                  style={imageNational}
                />
              )}
              <button
                onClick={() => setShowView(false)}
                style={{ padding: "8px 16px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "0.8rem" }}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
