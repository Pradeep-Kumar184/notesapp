import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
// create user
export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill All Fields",
      });
    }
    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User Already exists please login",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const user = new userModel({
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = JWT.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET
    );

    return res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
      token,
    });
    // const token = JWT.sign(
    //   { email: user.email, id: user._id },
    //   process.env.JWT_SECRET
    // );
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while create user",
      error,
    });
  }
};
// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide Email or Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not register",
      });
    }
    // password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    // token
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token: token,
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while login",
      error,
    });
  }
};
// get-all
