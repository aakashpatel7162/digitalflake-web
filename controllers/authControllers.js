const express = require("express");
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../utils/jwtUtil");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration Error: ", error);
    res.status(400).json({ error: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login, register };
