import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deleteUploadedFile } from "../utility/file.utility.js";

export const register = async (req, res) => {
  const { name, email, password, pictureUrl } = req.body;
  if (!name || !email || !password) {
    // Delete the uploaded file if it exists
    if (req.body.pictureUrl) {
      deleteUploadedFile(req.body.pictureUrl);
    }
    return res.status(400).json({ success: false, message: "Invalid Body." });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: encodedPassword,
      pictureUrl,
    });

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    // Delete the uploaded file if it exists
    if (req.body.pictureUrl) {
      deleteUploadedFile(req.body.pictureUrl);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


export const isLogin = async (req, res) => {
  try {
    // Retrieve the token from the cookies
    const token = req.cookies.accessToken;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token. Please log in again.",
        });
      }

      // Return the decoded user information
      return res.status(200).json({
        success: true,
        message: "User is logged in.",
        data: decoded,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required for login." });
  } else if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required for login." });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    delete user._doc.password;
    delete user._doc.createdAt;

    const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 3600000), // makes it so that the cookies are cleared automatically after 1 hour
    });

    return res.status(200).json({
      success: true,
      data: user,
      message: "Logged in successfully",
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error logging out" });
  }
};
