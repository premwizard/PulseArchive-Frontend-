import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Vault from "./components/Vault";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ErrorBoundary from "./ErrorBoundary";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import RecordForm from "./components/RecordForm";
import "./App.css";
import Home from "./components/Home"; // ✅ New Home page

// Chart component
const RecordChart = ({ records }) => {
  if (!records || records.length === 0)
    return <p>No records available for the chart.</p>;

  const data = {
    labels: records.map((r) => new Date(r.date).toLocaleDateString()),
    datasets: [
      {
        label: "Health Records Over Time",
        data: records.map((_, idx) => idx + 1),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "90%", margin: "0 auto" }}>
      <Line data={data} />
    </div>
  );
};

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

// Dashboard component
const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/records", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return (
    <div>
      <h1 style={{ color: "#272316ff" }}>PulseArchive</h1>
      
      <RecordForm token={token} onSaveRecord={fetchRecords} />

      {loading && <p>Loading records...</p>}

      <ErrorBoundary>
        <RecordChart records={records} />
      </ErrorBoundary>
    </div>
  );
};

// Main App component
const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Home Page */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/vault"
          element={
            <PrivateRoute>
              <Vault />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
