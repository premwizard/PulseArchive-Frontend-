import React from "react";

const RecordList = ({ records, onDeleteRecord, onEditRecord }) => {
  if (!records || records.length === 0) {
    return <p style={{ textAlign: "center", color: "#888" }}>No records found.</p>;
  }

  return (
    <div className="record-list">
      {records.map((record) => (
        <div key={record._id} style={styles.recordItem}>
          <div style={styles.header}>
            <h3 style={styles.title}>{record.title}</h3>
            <p style={styles.date}>{new Date(record.date).toLocaleDateString()}</p>
          </div>

          <p style={styles.description}>
            <strong>Description:</strong> {record.description}
          </p>

          {typeof record.isPublic !== "undefined" && (
            <p style={{ color: record.isPublic ? "#4caf50" : "#f44336", fontWeight: "bold" }}>
              {record.isPublic ? "Public Record" : "Private Record"}
            </p>
          )}

          {record.photoUrl ? (
            <div style={styles.photoContainer}>
              <img
                src={record.photoUrl.startsWith("http") ? record.photoUrl : `http://localhost:5000${record.photoUrl}`}
                alt={record.title}
                style={styles.photo}
              />
            </div>
          ) : (
            <p style={{ color: "#aaa", fontStyle: "italic" }}>No photo available</p>
          )}

          <div style={styles.actions}>
            <button onClick={() => onEditRecord(record)} style={styles.editBtn}>
              Edit
            </button>
            <button onClick={() => onDeleteRecord(record._id)} style={styles.deleteBtn}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Inline styles
const styles = {
  recordItem: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: "#f9f9f9",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  title: { margin: 0 },
  date: { margin: 0, color: "#555", fontSize: "0.9em" },
  description: { marginBottom: "8px" },
  photoContainer: { textAlign: "center", marginBottom: "8px" },
  photo: { maxWidth: "100%", maxHeight: "200px", borderRadius: "4px" },
  actions: { display: "flex", gap: "10px" },
  editBtn: {
    padding: "6px 12px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default RecordList;
