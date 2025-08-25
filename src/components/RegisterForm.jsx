import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "./Register.css";

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ hook for navigation

  // Auto-switch API URL between local & production
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://pulsearchive-backend.onrender.com/api/v1/auth/register"
      : "http://localhost:5000/api/v1/auth/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        onRegister?.(data.user, data.token); // optional callback

        // ✅ Redirect to dashboard/home
        navigate("/login"); // change "/dashboard" to "/home" if needed
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="register-container">
      {/* Left Side */}
      <div className="register-left">
        <h1>Join Us Today</h1>
      </div>

      {/* Right Side */}
      <div className="register-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Register
          </button>

          <p className="register-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
