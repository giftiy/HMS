// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // ✅ Dummy users for frontend-only login
  const dummyUsers = [
    { email: "admin@soreti.com", password: "Admin@123", role: "ADMIN" },
    { email: "manager@soreti.com", password: "Manager@123", role: "MANAGER" },
    { email: "chef@soreti.com", password: "Chef@123", role: "CHEFF_FOOD" },
    { email: "waiter@soreti.com", password: "Waiter@123", role: "WAITER" },
    { email: "cashier@soreti.com", password: "Cashier@123", role: "CASHIER" },
  ];

  // ✅ Password Validation
  const validatePassword = (pwd) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (pwd.length < minLength) return "Password must be at least 8 characters long";
    if (!hasUppercase) return "Password must include at least one uppercase letter";
    if (!hasLowercase) return "Password must include at least one lowercase letter";
    if (!hasNumber) return "Password must include at least one number";
    if (!hasSpecial) return "Password must include at least one special character";
    return "";
  };

  // ✅ Handle Login (frontend only)
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = dummyUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        setError("Email or Password is incorrect!");
      } else {
        localStorage.setItem("token", "dummy-token-123"); // simulate token
        localStorage.setItem("role", user.role);

        // Redirect based on role
        switch (user.role) {
          case "ADMIN":
            navigate("/dashboard");
            break;
          case "MANAGER":
            navigate("/manager/dashboard");
            break;
          case "CHEFF_FOOD":
          case "CHEFF_DRINK":
          case "CHEFF_SNACK":
            navigate("/chef/dashboard");
            break;
          case "WAITER":
            navigate("/waiter/dashboard");
            break;
          case "CASHIER":
            navigate("/cashier/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      }

      setLoading(false);
    }, 1000); // simulate network delay
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Soreti Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {passwordError && <p className="password-error">{passwordError}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="footer">© 2025 Soreti Cafe. All Rights Reserved.</p>
      </form>

      {/* Inline Styles */}
      <style>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #BFEAE6;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-form {
          background: #FFFAF2;
          padding: 3rem 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          width: 350px;
          text-align: center;
        }
        .login-form h2 {
          margin-bottom: 2rem;
          color: #3B3B3B;
          font-weight: 700;
          font-size: 1.8rem;
        }
        .login-form input {
          display: block;
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 1rem;
          border: 1px solid #DDD;
          border-radius: 8px;
          font-size: 1rem;
          background: #FFF7F0;
        }
        .login-form button {
          width: 100%;
          padding: 12px;
          background: #3B3B3B;
          color: #FFFAF2;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: 0.3s;
        }
        .login-form button:hover:enabled {
          background: #2A2A2A;
        }
        .error {
          color: red;
          margin-bottom: 1rem;
        }
        .password-error {
          color: orange;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .footer {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: #3B3B3B;
        }
      `}</style>
    </div>
  );
}
