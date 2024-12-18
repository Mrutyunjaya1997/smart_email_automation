import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailCard from "./EmailCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import "./EmailList.css";

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(5); // Items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByUnread, setSortByUnread] = useState(true);

  // Fetch emails from the backend
  const fetchEmails = async () => {
    const API_BASE_URL =
            process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000"
            : "https://smart-email-automation.onrender.com";

    try {
      const response = await axios.get(`${API_BASE_URL}/read_all`);
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  // Fetch emails on component mount
  useEffect(() => {
    fetchEmails();
    const interval = setInterval(fetchEmails, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Mark email as read
  const markAsRead = async (emailId) => {
    const API_BASE_URL =
            process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000"
            : "https://smart-email-automation.onrender.com";
    try {
      await axios.put(`${API_BASE_URL}/read_all/${emailId}/mark-as-read`);
      fetchEmails(); // Refresh the email list
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  // Filter emails by search term
  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get priority order
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  // Sort emails by read/unread and priority
  const sortedEmails = filteredEmails
    .sort((a, b) => {
      // First, sort by unread status (if sortByUnread is true)
      if (sortByUnread) {
        if (a.isRead === b.isRead) {
          // If both have the same read status, then sort by priority
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return a.isRead ? 1 : -1;
      } else {
        // If sortByUnread is false, just sort by priority
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });

  // Pagination logic
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = sortedEmails.slice(indexOfFirstEmail, indexOfLastEmail);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="email-list">
      <h1>Emails</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <button onClick={() => setSortByUnread(!sortByUnread)}>
        Sort by {sortByUnread ? "All" : "Unread"}
      </button>
      <div className="email-cards">
        {currentEmails.map((email) => (
          <EmailCard
            key={email.id}
            email={email}
            markAsRead={markAsRead}
          />
        ))}
      </div>
      <Pagination
        emailsPerPage={emailsPerPage}
        totalEmails={filteredEmails.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default EmailList;
