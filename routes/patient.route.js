import express from "express";
import patientController from "../controllers/patient.controller.js";

const router = express.Router();

router
  .route("/")
  .get(patientController.getAllPatients)
  .post(patientController.createPatient);

router
  .route("/:id")
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient);

export default router;
