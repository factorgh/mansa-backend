import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signJwt = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users) return res.status(400).send("Users not found");

  res.status(200).send(users);
};

const createUser = async (req, res) => {
  try {
    ///Get user data from req
    const newUser = await User.create(req.body);

    const token = signJwt(newUser._id);
    res.cookie[("auth_token", token)];
    res.status(200).json({
      status: "success",
      data: { newUser },
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      status: "fail",
      msg: "Cannot create user",
    });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(400).send("Users not found");

  res.status(200).send(user);
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const users = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!users) return res.status(400).send("Users not found");

  res.status(200).send(users);
};

const deleteUser = async () => {
  try {
    const { id } = req.params;
    await Patient.findByIdAndDelete({ _id: id });
    res.status(200).send("User deleted successfully");
  } catch (e) {
    console.log(e.message);
  }
};

export default {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
