import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecordForm.css";

const RecordForm = ({ token, onSaveRecord, editingRecord }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingRecord) {
      setTitle(editingRecord.title || "");
      setDescription(editingRecord.description || "");
      setDate(editingRecord.date ? editingRecord.date.split("T")[0] : "");
      setPreview(editingRecord.photo ? `https://pulsearchive-backend.onrender.com/${editingRecord.photo}` : null);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setPhoto(null);
      setPreview(null);
    }
  }, [editingRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      if (photo) formData.append("photo", photo);

      if (editingRecord?._id) {
        await axios.put(
          `https://pulsearchive-backend.onrender.com/api/records/${editingRecord._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "https://pulsearchive-backend.onrender.com/api/records",
          formData,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        );
      }

      if (onSaveRecord) onSaveRecord();

      setTitle("");
      setDescription("");
      setDate("");
      setPhoto(null);
      setPreview(null);
    } catch (err) {
      console.error("Failed to save record:", err);
      alert(err.response?.data?.message || "Failed to save record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Floating Background Shapes */}
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>
      <div className="bg-shape shape3"></div>

      <form onSubmit={handleSubmit} className="record-form">
        <h2>{editingRecord?._id ? "Update Record" : "Add New Record"}</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Enter title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <textarea 
            placeholder="Enter description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group file-input">
          <label htmlFor="photo-upload">📎 Upload Image</label>
          <input 
            id="photo-upload"
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files[0];
              setPhoto(file);
              if (file) setPreview(URL.createObjectURL(file));
            }} 
          />
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingRecord?._id ? "Update Record" : "Add Record"}
        </button>
      </form>
    </div>
  );
};

export default RecordForm;
