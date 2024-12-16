import React from "react";
import "./EmailCard.css";

const EmailCard = ({ email, markAsRead }) => {
  return (
    <div className={`email-card ${email.isRead ? "read" : "unread"}`}>
      <h3>{email.subject}</h3>
      <p>{email.body}</p>
      {!email.isRead && (
        <button onClick={() => markAsRead(email.id)}>Mark as Read</button>
      )}
    </div>
  );
};

export default EmailCard;
