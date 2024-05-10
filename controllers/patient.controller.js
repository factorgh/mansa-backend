import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";

const getAllPatients = async (req, res) => {
  const patient = await Patient.find();

  if (!patient) return res.status(400).send("Patients not found");

  res.status(200).send(patient);
};
const getPatient = async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findById(id);

  if (!patient) return res.status(400).send("Patients not found");

  res.status(200).send(patient);
};

const createPatient = async (req, res) => {
  try {
    ///Get user data from req
    const patient = await Patient.create(req.body);

    res.status(200).json({
      status: "success",
      data: { patient },
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      status: "fail",
      msg: "Cannot create patient",
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPatient = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPatient) return res.status(400).send("User cannot be updated");
    res.status(200).send(updatePatient);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      status: "fail",
      msg: e.message,
    });
  }
};

const deletePatient = async () => {
  try {
    const { id } = req.params;
    await Patient.findByIdAndDelete({ _id: id });
    res.status(200).send("Patient deleted successfully");
  } catch (e) {
    console.log(e.message);
  }
};

export default {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatient,
};
