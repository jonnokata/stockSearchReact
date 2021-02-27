import React, { useEffect, useState } from "react";

const LoginForm = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
};

const handleChange = (e) => {
  const newState = { ...formState };
  newState[e.target.name] = e.target.value;
  setFormState(newState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    props.onSubmit(formState.username, formState.password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="Username"
            value={formState.username}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Password
          <input
            name="Password"
            value={formState.password}
            onChange={handleChange}
          ></input>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export { LoginForm };
