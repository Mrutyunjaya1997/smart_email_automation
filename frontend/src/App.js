import React, { useEffect, useState } from "react";
import axios from "axios";
import EmailList from "./components/EmailList";
import SearchBar from "./components/SearchBar";
import Notification from "./components/Notification";
import FilterBar from "./components/FilterBar";

const App = () => {
    const [emails, setEmails] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newEmails, setNewEmails] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [filter, setFilter] = useState("all"); // Track filter type: 'all', 'read', 'unread'

    useEffect(() => {
        fetchEmails();
        const intervalId = setInterval(fetchEmails, 10000); // Refresh every minute
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filter, emails]);

    const fetchEmails = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8000/read_all/");
            const newEmailList = response.data.map((email) => ({
                ...email,
                isRead: false, // Add isRead field for tracking
            }));

            // Check for new messages
            const newMessages = newEmailList.filter(
                (email) => !emails.find((oldEmail) => oldEmail.id === email.id)
            );

            setEmails(newEmailList);
            setFilteredEmails(newEmailList);

            if (newMessages.length > 0) {
                setNewEmails(newMessages);
                setLastUpdated(Date.now());
            }
        } catch (err) {
            setError("Failed to fetch emails.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = () => {
        if (filter === "all") {
            setFilteredEmails(emails);
        } else if (filter === "read") {
            setFilteredEmails(emails.filter((email) => email.isRead));
        } else if (filter === "unread") {
            setFilteredEmails(emails.filter((email) => !email.isRead));
        }
    };

    const handleSearch = (query) => {
        const filtered = emails.filter(
            (email) =>
                email.subject.toLowerCase().includes(query.toLowerCase()) ||
                email.body.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredEmails(filtered);
    };

    const markAsRead = (id) => {
        setEmails(
            emails.map((email) =>
                email.id === id ? { ...email, isRead: true } : email
            )
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Emails Dashboard</h1>
            <Notification newEmails={newEmails} />
            <SearchBar onSearch={handleSearch} />
            <FilterBar filter={filter} setFilter={setFilter} />
            <EmailList emails={filteredEmails} markAsRead={markAsRead} />
        </div>
    );
};

export default App;
