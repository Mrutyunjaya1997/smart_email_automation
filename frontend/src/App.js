import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data immediately and then every minute
        fetchEmails();
        const intervalId = setInterval(fetchEmails, 60000); // 60000ms = 1 minute

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const fetchEmails = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8000/read_all/"); // FastAPI endpoint
            setEmails(response.data);
        } catch (err) {
            setError("Failed to fetch emails.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Emails (Auto-Refreshing Every Minute)</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {emails.map((email) => (
                    <li key={email.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
                        <h3>{email.subject}</h3>
                        <p>{email.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
