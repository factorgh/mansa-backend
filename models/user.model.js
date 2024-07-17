import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "User must have a firstName"],
  },
  lastName: {
    type: String,
    required: [true, "User must have a lastName"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  role: {
    type: String,
    enum: ["lab-tech", "nurse", "admin", "manager"],
    default: "nurse",
  },
  email: {
    type: String,
  },
  phoneNumber: Number,
  password: {
    type: String,
    required: [true, "User must have a password"],
    select: false,
  },
  photoUrl: String,
});

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10); //////fshdklejdhmnmdjskj,kdsljk
});

userSchema.methods.correctPass = async function (candidatePass, password) {
  return await bcrypt.compare(candidatePass, password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
