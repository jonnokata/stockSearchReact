// import express
const express = require("express");

// Create a new router to handle internal routes
const router = express.Router();

// Add a health check route
router.get("/", (request, response) =>
response.send("Handling root requests to internal routes")
);
router.get("/_health", (request, response) => response.send("OK"));

// Export your internal router so it can be used by index.js
module.exports = router;
