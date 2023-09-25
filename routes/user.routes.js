let express = require("express");
let UserRoute = express.Router();
require("dotenv").config;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let { UserModel } = require("../models/user.model");


//signup here//

UserRoute.post("/api/signup", async (req, res) => {
  try {
    let { email, password, Confirm_password } = req.body;
    if (password !== Confirm_password) {
      return res.status(401).send({
        message: "confirmed password is not matching, please try again",
      });
    }
//hashing here
    let hashPassword = await bcrypt.hash(password, 5);

    let user = new UserModel({
      email,
      password: hashPassword,
      Confirm_password,
    });
    await user.save();
    res.status(201).send({ message: "User registration successfully" });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});


//login part here 
UserRoute.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    let isPasswordRightone = await bcrypt.compare(password, user.password);

    if (!isPasswordRightone) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    let token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: 1000 * 60 * 24,
    });
    res.status(201).send({ message: "Login successfull", token });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});



module.exports = {
  UserRoute,
};
