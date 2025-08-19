import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Updated CSS file

const InputField = ({ type, placeholder, value, onChange }) => (
  <div className="input-group">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const SubmitButton = ({ loading, children }) => (
  <button type="submit" className="btn-primary" disabled={loading}>
    {loading ? "Logging in..." : children}
  </button>
);

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://pulsearchive-backend.onrender.com" + "/api/auth/login",
        { email, password }
      );

      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Welcome Back!</h1>
      </div>

      <div className="login-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton loading={loading}>Login</SubmitButton>
          <p className="register-link">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
