import { Schema, model } from "mongoose";

const schema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  phone: { type: String, default: "" },
  provider: { type: String, default: "" },
  status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
  passwordResetToken: { type: String, default: null },
  passwordResetAt: { type: Date, default: null },
  role: { type: String, default: "USER", enum: ["ADMIN", "USER"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("users", schema);
