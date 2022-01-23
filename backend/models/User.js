const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [15, "Maximum username length is 15 characters."],
  },
  email: {
    // firebase property : email;
    type: String,
    required: [true, "Please enter an email."],
    unique: true,
    lowercase: true,
  },
  isVerified: {
    // firebase property : email_verified;
    type: Boolean,
    default: false,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  Cart: {
    price: {
      type: Number,
      default: 0,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
