import React, { useState } from "react";
import "./EmailCard.css";

const EmailCard = ({ email, markAsRead }) => {
  const [showBody, setShowBody] = useState(false);

  // Function to get the color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ff7043"; // Orange for High
      case "Medium":
        return "#ffeb3b"; // Yellow for Medium
      case "Low":
        return "#66bb6a"; // Green for Low
      default:
        return "#888"; // Default gray color
    }
  };

  // Function to get the color based on sentiment
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "#66bb6a"; // Green for Positive
      case "Negative":
        return "#ff7043"; // Orange for Negative
      case "Neutral":
        return "#ffd54f"; // Yellow for Neutral
      default:
        return "#888"; // Default gray color
    }
  };

  return (
    <div className={`email-card ${email.isRead ? "read" : "unread"}`}>
      {/* Subject clickable to toggle body */}
      <h3
        className="email-subject"
        onClick={() => setShowBody(!showBody)}
        style={{ cursor: "pointer" }}
      >
        {email.subject}
      </h3>

      {/* Email body toggles visibility */}
      {showBody && <p className="email-body">{email.body}</p>}

      <div className="email-actions">
        {/* Priority and Sentiment as buttons with conditional styles */}
        <div className="buttons-right">
          <button
            className="btn-priority"
            style={{
              backgroundColor: getPriorityColor(email.priority),
              color: "black", // Text color set to black
            }}
          >
            Priority: {email.priority}
          </button>
          <button
            className="btn-sentiment"
            style={{
              backgroundColor: getSentimentColor(email.sentiment),
              color: "black", // Text color set to black
            }}
          >
            Sentiment: {email.sentiment}
          </button>
        </div>
      </div>

      {/* Show "Mark as Read" button only if the email is unread */}
      {!email.isRead && (
        <button className="btn-mark-read" onClick={() => markAsRead(email.id)}>
          Mark as Read
        </button>
      )}
    </div>
  );
};

export default EmailCard;
