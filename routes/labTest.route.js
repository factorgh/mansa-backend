import express from "express";
import labTestController from "../controllers/labtest.controller.js";

const router = express.Router();

router
  .route("/")
  .get(labTestController.getLabTest)
  .post(labTestController.conductLabTest);

router.put("/status/:id", labTestController.updateLabStatus);

router.get("/download", labTestController.downloadReport);
router.get("/file/:fileNumber", labTestController.getPatientByFileNumber);

router
  .route("/:id")
  .get(labTestController.getOneTest)
  .put(labTestController.editLabTest)
  .delete(labTestController.delLabTest);

export default router;
