import express from "express";
import patientController from "../controllers/patient.controller.js";

const router = express.Router();

router
  .route("/")
  .get(patientController.getAllPatients)
  .post(patientController.createPatient);
router.get("/file/:fileNumber", patientController.getPatientByFile);
router.get("/download", patientController.downloadReport);
router
  .route("/:id")
  .get(patientController.getPatient)
  .put(patientController.updatePatient)
  .delete(patientController.deletePatient);

router.put("/status/:id", patientController.updatePatientStatus);

export default router;
