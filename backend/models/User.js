const mongoose = require("mongoose");
// <<In the future we are going to need them.>>
////// const { isEmail } = require("validator");
////// const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [15, "Maximum username length is 15 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: true,
    lowercase: true,
    // validate: [isEmail, "Please enter a valide email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minLength: [8, "Minimum password length is 8 characters."],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// static method to login user
// UserSchema.statics.login = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error("incorrect password");
//   }
//   throw Error("incorrect email");
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
