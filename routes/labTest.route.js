import express from "express";
import labTestController from "../controllers/labtest.controller.js";

const router = express.Router();

router
  .route("/")
  .get(labTestController.getLabTest)
  .post(labTestController.conductLabTest);

router
  .route("/:id")
  .get(labTestController.getOneTest)
  .put(labTestController.editLabTest)
  .delete(labTestController.delLabTest);

export default router;
