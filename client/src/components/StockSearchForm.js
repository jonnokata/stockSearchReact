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
      <form onSubmit={handleSubmit} class="form-container" id="stock-form">
        <div class="form-inline">
          <label for="inlineFormInputGroupStockName"></label>
          <input
            type="text"
            class="form-input"
            id="inlineFormInputGroupStockName"
            name="stock"
            placeholder="&#128269 Search for stock"
            value={formState.searchParam}
            onChange={handleChange}
          ></input>
          <button type="submit" id="search-submit" class="btn btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export { StockSearchForm };
