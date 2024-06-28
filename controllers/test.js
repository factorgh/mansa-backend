import Test from "../models/test.js";

const createHospitalTest = async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(200).json({
      status: "success",
      data: { test },
    });
  } catch (error) {
    res.status(400).send("Error conductin lab test");
  }
};
const getAllHospitalTest = async (req, res) => {
  try {
    const results = await Test.find();

    if (!results) return res.status(404).send("Cannot load tests");
    res.status(200).send(results);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const getHospitalTest = async (req, res) => {
  try {
    const results = await Test.findById(req.params.id);

    if (!results) return res.status(404).send("Cannot load lab test");
    res.status(200).send(results);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const delHospitalTest = async (req, res) => {
  await Test.findByIdAndDelete({ _id: req.params.id });
  res.status(200).send("success");
};

const updateHospitalTest = async (req, res) => {
  console.log("<-----------test route--------->", req.body);
  const test = await Test.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  if (!test) return res.status(400).send("Cannot get test");
  res.status(200).send(test);
};

export default {
  getAllHospitalTest,
  delHospitalTest,
  updateHospitalTest,
  getHospitalTest,
  createHospitalTest,
};
