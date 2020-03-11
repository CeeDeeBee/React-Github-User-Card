import React from "react";
import "./Search.css";

const Search = ({ setUser, inputValue, updateInputValue }) => {
    return (
        <div className="search-wrapper">
            <form onSubmit={setUser}>
                <input
                    value={inputValue}
                    onChange={updateInputValue}
                    type="text"
                    placeholder="GitHub User"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Search;