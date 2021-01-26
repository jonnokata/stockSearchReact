// import express
const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

// Create a new router to handle internal routes
const router = express.Router();

// Add a health check route
router.get("/save-something-in-session", (request, response) => {
  request.session.testProperty = "testing that this string gets saved";
  response.send("OK");
});

router.get("/retrieve-session-value", (request, response) => {
    response.send(request.session.testProperty);
  });
  
  router.get("/expire-session", (request, response) => {
    request.session.destroy(() => response.send("OK"));
  });

  // Register
  router.post("/register", (request, response) => {
    const body = request.body;
    console.log('user register body:', body);

    const passwordHash = bcrypt.hashSync(body.password, 10);
    console.log('passwordHash:', passwordHash);
  
    const user = {username: body.username, password: passwordHash, email: body.email};
    console.log('user:', user);
  
    UserModel.create(user).then((userData) => {
      response.send(userData);
    }).catch((error) => {
        response.send(error);
    });
  });

  // Login
  router.post("/login", (request, response) => {
    UserModel.findOne({username: request.body.username}).then((userData) => {
      if(userData) {
        const checkHashPassword = bcrypt.compareSync(
          request.body.password, 
          userData.password
          );
          if(checkHashPassword) {
            console.log("request.session:", request.session);
            request.session.user = {
              id: userData._id,
            };
            console.log("request.session", request.session);
            response.send("logged in"); 
          } else {
            response.status(401).send("Wrong credentials");
          }
        } else {
          response.status(401).send('Invalid username or password');
        }
      });
    });

  // Logout
  router.get("/logout", (request, response) => {
    request.session.loggedIn = false;
    response.send("User has logged out!");
  });

  // Update user info (e.g. update email)


  // Delete user profile/account

  module.exports = router;
