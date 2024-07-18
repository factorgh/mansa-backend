import Patient from "../models/patient.model.js";

const calculateWaitTime = async () => {
  const patients = await Patient.find();
  const numPatients = patients.length;
  const waitTime = numPatients * 40 * 60;
  return waitTime;
};

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
    const patient = await Patient.create(req.body);
    ///Get user data from req
    // const patient = new Patient(req.body);
    //Calculate the waitPeriod before saving data to the db
    // patient.waitPeriod = await calculateWaitTime();
    // await patient.save();

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

    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPatient)
      return res.status(400).send("Patient cannot be updated");
    res.status(200).send(updatedPatient);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      status: "fail",
      msg: e.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).send("Patient deleted successfully");
  } catch (e) {
    console.log(e.message);
  }
};

const updatePatientStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

///Download lab results
const downloadReport = async (req, res) => {
  try {
    const results = await Patient.find().select("-__v -_id");

    if (!results) return res.status(404).send("Cannot load patients report");
    res.status(200).send(results);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getPatientByFile = async (req, res) => {
  // Get file from req.params
  const { fileNumber } = req.params;

  // Get patient from db by file number
  const patient = await Patient.findOne({ fileNumber: fileNumber });
  console.log(patient);
  // Defense mechanism
  if (!patient) return res.status(404).send("No patient with file number");

  // send patient data as response
  res.status(200).send(patient);
};

export default {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatient,
  updatePatientStatus,
  downloadReport,
  getPatientByFile,
};
