import React, { useState } from "react";
import Pagination from "./Pagination";

const EmailList = ({ emails, markAsRead }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const emailsPerPage = 5;

    const indexOfLastEmail = currentPage * emailsPerPage;
    const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
    const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subject</th>
                        <th>Body</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmails.map((email, index) => (
                        <tr key={email.id} className={email.isRead ? "table-light" : "table-primary"}>
                            <td>{index + 1}</td>
                            <td>{email.subject}</td>
                            <td>{email.body}</td>
                            <td>{email.isRead ? "Read" : "Unread"}</td>
                            <td>
                                {!email.isRead && (
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => markAsRead(email.id)}
                                    >
                                        Mark as Read
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                emailsPerPage={emailsPerPage}
                totalEmails={emails.length}
                paginate={paginate}
            />
        </div>
    );
};

export default EmailList;
