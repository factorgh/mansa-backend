import express from "express";
import userController from "../controllers/user.controller.js";
import authController from "../controllers/auth.controller.js";
import User from "../models/user.model.js";

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);
router.route("/logout").get(authController.logout);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser);

export default router;
