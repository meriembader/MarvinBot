const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
      resetPasswordLink: {
        data: String,
        default: ''
    },
    resetPasswordExpire: Date,
  })
);
async function findAllUserByRole() {
  const users = await collection().aggregate([
    { $group: { _id: "$role", nb_user: { $sum: 1 } } },
  ]);
  return users;
}
module.exports = User;