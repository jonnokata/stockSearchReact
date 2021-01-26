const mongoose = require("mongoose");

// Define schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username already exists. Please choose another.'],
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
        min: [6, 'Password must be at least 6 characters.'],
        required: [true, 'Password is required.']
    },
    email:  {
        type: String,
        unique: [true, 'Email already exists. Please use another.'],
        required: [true, 'Email is required.']
    },
    // favourites: {
    //     type: String,
    //     stockTicker: String,
    //     stockPrice: String
    // },
    // favouritesId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "favourites"
    //   }
});

// Export model to use in userRoutes.js
module.exports = mongoose.model("users", userSchema);