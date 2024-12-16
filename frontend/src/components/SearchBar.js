import React from "react";

const SearchBar = ({ onSearch }) => {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search emails..."
                className="form-control"
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
