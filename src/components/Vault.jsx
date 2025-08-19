import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import RecordList from "./RecordList"; // Display records
import { AuthContext } from "../context/AuthContext";
import "./Vault.css";

const Vault = () => {
  const { token } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch records from backend
  const fetchRecords = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://pulsearchive-backend.onrender.com/api/records", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch records");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Delete a record
  const handleDeleteRecord = async (id) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`https://pulsearchive-backend.onrender.com/api/records/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete record");
    }
  };

  // Edit record callback (optional)
  const handleEditRecord = (record) => {
    alert("Editing is disabled in Vault"); // Since form is removed
  };

  if (!token) {
    return (
      <div className="vault-container">
        <p className="vault-message error">⚠️ Please log in to view your records.</p>
      </div>
    );
  }

  return (
    <div className="vault-container">
      <h1 style={{ color: "#272316ff" }}>PulseArchive</h1>
      <h2> Your Secure Vault</h2>

      {loading && <p className="vault-message">⏳ Loading records...</p>}
      {error && <p className="vault-message error">❌ {error}</p>}
      {!loading && records.length === 0 && (
        <p className="vault-message">📂 No records found.</p>
      )}

      {/* Record List */}
      <div className="records-grid">
        <RecordList
          records={records}
          onEditRecord={handleEditRecord} // Disabled
          onDeleteRecord={handleDeleteRecord}
        />
      </div>
    </div>
  );
};

export default Vault;
