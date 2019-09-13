const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    age: Number,
    email: String,
    password: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);