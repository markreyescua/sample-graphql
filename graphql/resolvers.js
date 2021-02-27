const User = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");

module.exports = {
  createUser: async function ({ userInputData }, req) {
    const email = userInputData.email;
    const name = userInputData.password;
    const password = userInputData.password;
    const errors = [];

    if (!validator.isEmail(email)) {
      errors.push({
        message: "Invalid email.",
      });
    }

    if (validator.isEmpty(password)) {
      errors.push({
        message: "Password is required.",
      });
    }

    if (!validator.isLength(password, { min: 5 })) {
      errors.push({
        message: "Password is too short.",
      });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error("User exists already!");
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      name: name,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },
};
