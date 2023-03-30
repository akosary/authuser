const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, match: /.+@.\..+/ },
  password: String,
  token: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
