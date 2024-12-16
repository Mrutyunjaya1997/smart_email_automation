import React from "react";

const FilterBar = ({ filter, setFilter }) => {
    return (
        <div className="d-flex justify-content-center mb-4">
            <button
                className={`btn btn-primary mx-2 ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
            >
                All
            </button>
            <button
                className={`btn btn-success mx-2 ${filter === "read" ? "active" : ""}`}
                onClick={() => setFilter("read")}
            >
                Read
            </button>
            <button
                className={`btn btn-warning mx-2 ${filter === "unread" ? "active" : ""}`}
                onClick={() => setFilter("unread")}
            >
                Unread
            </button>
        </div>
    );
};

export default FilterBar;
