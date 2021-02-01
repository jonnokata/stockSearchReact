import stockSearch from "../stockSearch";

const form = `
<div class="container-fluid">  
  <div class="logo-container">
            <a href="https://imgur.com/gEQ7SUO"><img src="https://i.imgur.com/gEQ7SUO.png" title="source: imgur.com" /></a>        
  </div>
  <div class="form-container">  
<form id="update-user-details">
  <h1>Update your profile details</h1>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" placeholder="Please enter your new username" name="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" placeholder="Please enter your new assword" name="password">
    </div>
    <button type="submit" id="update-user-info" class="btn btn-primary">Submit</button>
  </form>
  </div>
  </div>
  </div>
`;

const updateUser = () => {
  $(document).on("submit", "#update-user-details", async (event) => {
    event.preventDefault();

    // Extract username and password entered
    const formData = {
      username: $("input[name='username']").val(),
      password: $("input[name='password']").val(),
    };

    // Make a call to validate user name and password
    try {
      const response = await $.ajax({
        type: "PATCH",
        url: "/api/users/update-user",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });

      console.log("this worked");

      // Clear current login form as login is successful by calling empty() function
      $("body").empty();

      // Append the stock search to the body allowing the user to create/update/delete fruits
      $("body").append(stockSearch());
      window.alert("Your details have been updated!");
    } catch (err) {
      // If there's a problem updating the details in, then add a message to let user know that an invalid combination was provided
      $("body").append("<div>Invalid user/pass provided!</div>");
      console.log("this didn't work");
    }
  });
  return form;
};

export default updateUser;
