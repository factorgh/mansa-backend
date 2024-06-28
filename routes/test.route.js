import express from "express";
import testController from "../controllers/test.js";

const router = express.Router();

router
  .route("/")
  .get(testController.getAllHospitalTest)
  .post(testController.createHospitalTest);

router
  .route("/:id")
  .get(testController.getHospitalTest)
  .put(testController.updateHospitalTest)
  .delete(testController.delHospitalTest);

export default router;
