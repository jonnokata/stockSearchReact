import loginUser from "./loginUser";

const form = `
<div class="container-fluid">  
  <div class="logo-container">
            <a href="https://imgur.com/gEQ7SUO"><img src="https://i.imgur.com/gEQ7SUO.png" title="source: imgur.com" /></a>        
  </div>
  <div class="form-container">  
  <form id="new-user">
  <h1>Sign up</h1>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" placeholder="Please enter username" name="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" placeholder="Please enter password" name="password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  </div>
  </div>
  </div>
`;

const newUser = () => {
  $(document).on("submit", "#new-user", async (event) => {
    event.preventDefault();

    // Extract user name and password from the form
    const formData = {
      username: $("input[name='username']").val(),
      password: $("input[name='password']").val(),
    };

    try {
      // Make a POST request to the server to create a new user
      const response = await $.ajax({
        type: "POST",
        url: "/api/users/register",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });

      // Clear form by calling empty function
      $("body").empty();

      // Append the login form so user can now login
      $("body").append(loginUser());
    } catch (err) {
      // Inform user that their login could not be created if there's an error
      $("body").append("<div>Could not create user</div>");
    }
  });
  return form;
};

export default newUser;
