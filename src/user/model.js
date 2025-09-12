const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true, // allow multiple null emails
      validate: {
        validator: function (v) {
          // email optional if phone is provided
          return v || this.phone;
        },
        message: "Either email or phone must be provided",
      },
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // allow multiple null phones
      validate: {
        validator: function (v) {
          // phone optional if email is provided
          return v || this.email;
        },
        message: "Either phone or email must be provided",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, phone: this.phone },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15h" }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, phone: this.phone },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15d" }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
