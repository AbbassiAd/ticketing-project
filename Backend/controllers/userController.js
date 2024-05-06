import User from "../models/usersModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import bcrypt from "bcryptjs";
import generateToken from "../config/generatToken.js";

//register new user function---------------------------//
const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, phone, email, password, isAdmin , pic  } = req.body;
    if (!firstname || !lastname || !phone || !email || !password) {
      return res.status(404).json({ message: "all fields required" });
    }
    //check if the user is already existing
    const existing = await User.findOne({
      firstname: firstname,
      lastname: lastname,
    });
    if (existing) {
      return res.status(404).json({
        message: `${existing.firstname} ${existing.lastname} already exists`,
      });
    }
    //check if the phone number already used
    const existPhone = await User.findOne({ phone });
    if (existPhone) {
      return res
        .status(404)
        .json({ message: `${existPhone.phone} already used` });
    }
    //check if the email is already used
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(404).json({ message: "Email already used" });
    }
    //hash the entered password
    const hashPassword = await bcrypt.hash(password, 10);
    //create new user
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPassword,
      phone: phone,
      isAdmin: isAdmin,
    });

    if (user) return res.status(201).json(user);
    //
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});
export {registerUser}