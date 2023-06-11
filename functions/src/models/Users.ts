import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema({
  _id: Number,
  chno: {
    unique: true,
    required: true,
    type: Number,
  },
  sex: { type: String, required: true },
  dob: { type: Number, required: true },
});

const Patient = mongoose.model("Patient", patientSchema);

export { Patient };
