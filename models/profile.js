const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    pronouns: String,
    nationality: String,
    native_language: String,
    language_level: String,
    language_history: String,
    goal: String,
    favorite_genre: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Profile", ProfileSchema);