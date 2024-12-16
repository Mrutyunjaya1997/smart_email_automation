import React from "react";

const Notification = ({ newEmails }) => {
    if (newEmails.length === 0) return null;

    return (
        <div
            className="alert alert-success text-center"
            role="alert"
        >
            {newEmails.length} new message(s) received! Check below.
        </div>
    );
};

export default Notification;
