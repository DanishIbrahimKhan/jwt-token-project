const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "user register successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user with this email doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "login succesfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllUsersEmail = async (req,res) => {
    try{
        const users = await User.findAll({attributes:['email']})
        const emails = users.map(user=>user.email);
        res.status(200).json({emails})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
exports.webHookForGit = async (req,res) => {
  try{
    const gitPayload = req.body;
    res.status(200).json({gitPayload});
    console.log(gitPayload);
  }catch(error){
    res.status(500).json({error:error.message})
    console.log(error)
  }
}