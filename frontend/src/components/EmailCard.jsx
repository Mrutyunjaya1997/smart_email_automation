import React from "react";
import "./EmailCard.css";

const EmailCard = ({ email, markAsRead }) => {
  return (
    <div className={`email-card ${email.isRead ? "read" : "unread"}`}>
      <h3>{email.subject}</h3>
      <p>{email.body}</p>

      <div className="email-actions">
        <div className="btn-priority">
          Priority: <span>{email.priority}</span>
        </div>
        <div className="btn-sentiment">
          Sentiment: <span>{email.sentiment}</span>
        </div>
      </div>

      {!email.isRead && (
        <button onClick={() => markAsRead(email.id)}>Mark as Read</button>
      )}
    </div>
  );
};

export default EmailCard;
