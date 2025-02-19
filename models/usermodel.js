const mongoose = require("mongoose");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: null },
    confirmationTokenExpiration: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Method to generate a confirmation token
UserSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.confirmationToken = token;
  this.confirmationTokenExpiration = Date.now() + 3600000; // 1 hour expiration
  return token;
};

// Method to reset confirmation token
UserSchema.methods.resetConfirmationToken = function () {
  this.confirmationToken = null;
  this.confirmationTokenExpiration = null;
  return this.save();
};

module.exports = mongoose.model("User", UserSchema);
