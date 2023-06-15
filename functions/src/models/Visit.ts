import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema({
  fullname: { type: String, required: true },
  chno: {
    unique: true,
    required: true,
    type: Number,
  },
  sex: { type: String, required: true },
  yearofbirth: { type: Number, required: true },
  dateofenrolment: {
    type: Number,
    default: () => {
      new Date().getTime();
    },
  },
  zone: { type: String, required: true },
  woreda: { type: String, required: true },
  city: { type: String, required: true },
  kebele: String,
  housenumber: String,
  phonenumber: Number,
  initialdiganosis: String,
});

const Patient = mongoose.model("Patient", patientSchema);

export { Patient };
