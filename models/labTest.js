import mongoose, { Schema } from "mongoose";

const labTestSchema = new mongoose.Schema({
  testName: String,
  patient: String,
  fileNumber: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "isActive"],
    default: "pending",
  },
  arrivalTime: { type: Date, default: Date.now },
  waitPeriod: { type: Number, default: 0 },
});

const LabTest = mongoose.model("LabTest", labTestSchema);

export default LabTest;
