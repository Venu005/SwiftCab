const mongoose = require("mongoose");
const bcrypt = rrequire("bcryptjs");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /[\x00-\x7F]+@[\x00-\x7F]+\.(com|in|org)/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false, // doesn't return password in query results
  },
  //currently taking the rides or not
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  //  vehicle details

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"], //! actuall 10
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"], // bikes basic
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["moto", "car", "auto-rickshaw"],
    },
  },
  // location
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.genAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Captain = mongoose.model("captain", captainSchema);

module.exports = Captain;
