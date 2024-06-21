import LabTest from "../models/labTest.js";

const conductLabTest = async (req, res) => {
  try {
    const labTest = LabTest.create(req.body);
    res.status(200).json({
      status: "success",
      data: { labTest },
    });
  } catch (error) {
    res.status(400).send("Error conductin lab test");
  }
};

const getLabTest = async (req, res) => {
  try {
    const results = await LabTest.find();

    if (!results) return res.status(404).send("Cannot load lab tests");
    res.status(200).send(results);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const getOneTest = async (req, res) => {
  try {
    const results = await LabTest.findById(req.params.id);

    if (!results) return res.status(404).send("Cannot load lab test");
    res.status(200).send(results);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const delLabTest = async (req, res) => {
  await LabTest.findByIdAndDelete({ _id: req.params.id });
  res.status(200).send("success");
};

const editLabTest = async (req, res) => {
  console.log("<-----------test route--------->", req.body);
  const patient = await LabTest.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  if (!patient) return res.status(400).send("Cannot get patient test");
  res.status(200).send(patient);
};

const updateLabStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedLab = await LabTest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updatedLab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const downloadReport = async (req, res) => {
  try {
    const results = await LabTest.find().select("-__v -_id");

    if (!results) return res.status(404).send("Cannot load lab tests");
    res.status(200).send(results);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export default {
  conductLabTest,
  getLabTest,
  delLabTest,
  editLabTest,
  getOneTest,
  updateLabStatus,
  downloadReport,
};
