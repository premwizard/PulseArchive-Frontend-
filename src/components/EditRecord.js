// EditRecord.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function EditRecord({ recordId, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    photo: null
  });

  useEffect(() => {
    // fetch record details
    axios.get(`/api/records/${recordId}`).then(res => {
      setFormData({
        title: res.data.title,
        description: res.data.description,
        date: res.data.date.split("T")[0],
        photo: null
      });
    });
  }, [recordId]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("date", formData.date);
    if (formData.photo) data.append("photo", formData.photo);

    const res = await axios.put(`/api/records/${recordId}`, data);
    onUpdate(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input type="file" name="photo" onChange={handleChange} />
      <button type="submit">Update Record</button>
    </form>
  );
}

export default EditRecord;
