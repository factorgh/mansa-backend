import LabTest from "../models/labTest.js";

const conductLabTest = async (req, res) => {
  try {
    const labTest = new LabTest(req.body);
    await labTest.save();
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
    const { id } = req.params;
    const results = await LabTest.findById(id);

    if (!results) return res.status(404).send("Cannot load lab test");
    res.status(200).send(results);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const delLabTest = async (req, res) => {
  await LabTest.findByIdAndDelete({ _id: req.params.id });
  res.status(400).send("success");
};

const editLabTest = async (req, res) => {
  const patient = await LabTest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!patient) return res.status(400).send("Cannot get patient test");
  res.status(200).send(patient);
};

export default {
  conductLabTest,
  getLabTest,
  delLabTest,
  editLabTest,
  getOneTest,
};
