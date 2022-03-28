import { useState } from "react";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/products/search/${keyword}`);
        } else {
            history.push("/products");
        }
    };
    return (
        <form onSubmit={searchHandler}>
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    id="search_field"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button id="search_btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </form>
    );
};

export default Search;
