import mongoose, { Schema } from "mongoose";

const TestSchema = new mongoose.Schema({
  name: String,
  description: String,
  time: Number,
});

const Test = mongoose.model("Test", TestSchema);

export default Test;
