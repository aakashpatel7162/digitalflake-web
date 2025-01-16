const express = require("express");
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwtUtil");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res
    .status(200)
    .json({ message: "user login successfully", token: generateToken(user) });
};
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.res(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, register };
