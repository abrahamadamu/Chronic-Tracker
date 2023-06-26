import mongoose, { Schema } from "mongoose";

//Temporary schema to only allow adding with only reg no and ch no
const patientSchema = new Schema({
  regno: {
    type: Number,
    required: true,
    unique: true,
  },
  firstname: { type: String },
  fathername: { type: String },
  grandfathername: String,
  chno: {
    unique: true,
    required: true,
    type: Number,
  },
  sex: { type: String },
  yearofbirth: { type: Number },
  dateofenrolment: {
    type: Number,
    default: () => {
      new Date().getTime();
    },
  },
  zone: { type: String },
  woreda: { type: String },
  city: { type: String },
  kebele: String,
  housenumber: String,
  phonenumber: Number,
  initialdiganosis: String,
});
// const patientSchema = new Schema({
//   regno: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   firstname: { type: String, required: true },
//   fathername: { type: String, required: true },
//   grandfathername: String,
//   chno: {
//     unique: true,
//     required: true,
//     type: Number,
//   },
//   sex: { type: String, required: true },
//   yearofbirth: { type: Number, required: true },
//   dateofenrolment: {
//     type: Number,
//     default: () => {
//       new Date().getTime();
//     },
//   },
//   zone: { type: String, required: true },
//   woreda: { type: String, required: true },
//   city: { type: String, required: true },
//   kebele: String,
//   housenumber: String,
//   phonenumber: Number,
//   initialdiganosis: String,
// });

const Patient = mongoose.model("Patient", patientSchema);

export { Patient };
