import React from "react";
import "../styles/RecordCard.css";

const RecordCard = ({ record }) => {
  return (
    <div className="record-card">
      <h3 className="record-title">{record.title}</h3>
      <p className="record-description">{record.description}</p>
      <span className="record-date">
        {new Date(record.date).toLocaleDateString()}
      </span>

      {record.photo && (
        <div className="record-image-wrapper">
          <img
            src={`https://pulsearchive-backend.onrender.com/${record.photo}`}
            alt={record.title}
            className="record-image"
          />
        </div>
      )}
    </div>
  );
};

export default RecordCard;
