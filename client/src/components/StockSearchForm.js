import React, { useEffect, useState } from "react";

const StockSearchForm = (props) => {
  const [formState, setFormState] = useState({
    searchParam: "",
  });

  // What does the {...formState} do?
  const handleChange = (e) => {
    const newState = { ...formState };
    newState[e.target.name] = e.target.value;
    setFormState(newState);
  };

  // What does this handleSubmit function do?
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formState.searchParam);
  };

  // What is the purpose of onSubmit in the form tags?
  // What is the purpose of "onChange" in the input field?
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container" id="stock-form">
        <div className="form-inline">
          <label htmlFor="inlineFormInputGroupStockName"></label>
          <input
            type="text"
            className="form-input"
            id="inlineFormInputGroupStockName"
            name="searchParam"
            placeholder="Search for stock"
            value={formState.searchParam}
            onChange={handleChange}
          ></input>
          <button type="submit" id="search-submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export { StockSearchForm };
