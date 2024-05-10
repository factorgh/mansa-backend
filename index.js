import bodyParser from "body-parser";
import express from "express";
import morgan, { format } from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import patientRoutes from "./routes/patient.route.js";
import testRoutes from "./routes/labTest.route.js";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import Patient from "./models/patient.model.js";
import LabTest from "./models/labTest.js";

///Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("ERROR💥", "shutting down...");
  process.exit(1);
});

//Configure environment path
dotenv.config({ path: "./.config.env" });

//Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DATABASE CONNECTED SUCCESSFULLY"));

///Create express instance
const app = express();

app.use(cors());

///HHTP HAEDER SECUIRTY
app.use(helmet());

///MIDDLEWARE
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

///data sanitaization against nosql  query injections
app.use(mongoSanitize());

//data sanitization against xss attacks
app.use(xss());

app.use(morgan("common"));
app.use(bodyParser.json());

//handling statics files
app.use(express.static("public"));

const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP address.Please try again in an hour",
});
app.use("/api", limiter);

///Prevent parameter pollution ,Yet to implement
app.use(
  hpp({
    whitelist: [""],
  })
);

///applicaton route
app.use("/health", (req, res) => {
  res.send("ok");
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/tests", testRoutes);

setInterval(async () => {
  const patients = await Patient.find();
  patients.forEach(async (patient) => {
    const arrivalTime = patient.arrivalTime;
    const currentTime = new Date();
    const waitPeriod = Math.floor((currentTime - arrivalTime) / (1000 * 60)); // Convert milliseconds to minutes
    patient.waitPeriod = waitPeriod;
    await patient.save();
  });
}, 60000); // Update every minute

setInterval(async () => {
  const patients = await LabTest.find();
  patients.forEach(async (patient) => {
    const arrivalTime = patient.arrivalTime;
    const currentTime = new Date();
    const waitPeriod = Math.floor((currentTime - arrivalTime) / (1000 * 60)); // Convert milliseconds to minutes

    patient.waitPeriod = waitPeriod;
    await patient.save();
  });
}, 60000); // Update every minute

//Create port
const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`SERVER STARTED ON ${port}`));

///Hanndling unhandle rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("ERROR💥", "shutting down...");
  server.close(process.exit(1));
});
