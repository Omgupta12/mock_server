require("dotenv").config();
const express = require("express");
const authModel = require("../model/auth.model");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const app = express.Router();

// <<<<<<<<<<<<<<<<--- LOGIN ROUTE --->>>>>>>>>>>>>>>
app.post("/login", async (request, response) => {
  const { username, email, password } = request.body;

  const user = await authModel.findOne({ email });
  if (!user) {
    return response.status(403).json({ message: "Wrong credentials" });
  }

  try {
    if (
      user.password === password ||
      (await argon2.verify(user.password, password))
    ) {
      const jwtToken = jwt.sign({ username, email },123456, {
        expiresIn: "10 days",
      });
      return response
        .status(201)
        .send({ message: "Login Successfull", token: jwtToken });
    } else {
      response.status(404).json({ message: "Wrong Password" });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

// <<<<<<<<<<<<<<<<--- SIGNUP ROUTE --->>>>>>>>>>>>>>>
app.post("/signup", async (request, response) => {
  const { username, email, password } = request.body;

  const findUserEmail = await authModel.findOne({ email });
  if (findUserEmail) {
    return response.status(400).json({ message: "Email already exit!" });
  }

// password hashed
  const hash = await argon2.hash(password);
  try {
    const user = new authModel({ username, email, password: hash });
    await user.save();
    return response.status(201).json({ message: "User created" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

module.exports = app;
