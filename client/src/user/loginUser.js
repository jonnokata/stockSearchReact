import newUser from "./newUser";
import stockSearch from "../stockSearch";

const form = `
<div class="container-fluid">  
  <div class="logo-container">
            <a href="https://imgur.com/gEQ7SUO"><img src="https://i.imgur.com/gEQ7SUO.png" title="source: imgur.com" /></a>        
  </div>
  <div class="form-container">
    <form id="login-user">
      <h1>Login</h1>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" placeholder="Please enter username" name="username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Please enter password" name="password">
      </div>
      <button type="submit" id="login-button" class="btn btn-primary">Submit</button>
      <button type="button" id="register-new-user" class="btn btn-primary">Register new user </button>
    </form>
    </div>
  </div>
`;

const loginUser = () => {
  $(document).on("submit", "#login-user", async (event) => {
    event.preventDefault();

    // Extract username and password entered
    const formData = {
      username: $("input[name='username']").val(),
      password: $("input[name='password']").val(),
    };

    // Make a call to validate user name and password
    try {
      const response = await $.ajax({
        type: "POST",
        url: "/api/users/login",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });

      // Clear current login form as login is successful by calling empty() function
      $("body").empty();

      // Append the stock search to the body allowing the user to create/update/delete fruits
      $("body").append(stockSearch());
    } catch (err) {
      // If there's a problem logging in, then add a message to let user know that an invalid combination was provided
      $("body").append("<div>Invalid user/pass provided!</div>");
    }
  });
  return form;
};

// Add event listener for Register new user button being clicked
$(document).on("click", "#register-new-user", () => {
  // Clear current login form
  $("body").empty();

  // Append new user form instead
  $("body").append(newUser());
});

export default loginUser;
