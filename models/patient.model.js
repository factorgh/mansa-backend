import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "User must have a firstName"],
  },
  lastName: {
    type: String,
    required: [true, "User must have a lastName"],
  },
  phoneNumber: Number,
  fileNumber: Number,
  purpose: {
    type: String,
    enum: ["consulting", "wound-dressing", "anti-natal", "outreach"],
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  arrivalTime: { type: Date, default: Date.now },
  waitPeriod: { type: Number, default: 0 },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
