import mongoose, { Schema } from "mongoose";

// Temporary schema to only allow adding with only reg no and ch no
const patientSchema = new Schema({
  regno: {
    type: Number,
    required: true,
    unique: true,
  },
  givenname: { type: String, trim: true, lowercase: true },
  middlename: { type: String, trim: true, lowercase: true },
  familyname: { type: String, trim: true, lowercase: true },
  chno: {
    unique: true,
    required: true,
    type: Number,
  },
  sex: { type: String, trim: true, enum: ["m", "f"] },
  yearofbirth: { type: Number },
  dateofenrolment: {
    type: Number,
    default: () => {
      new Date().getTime();
    },
  },
  zone: { type: String, trim: true, lowercase: true },
  woreda: { type: String, trim: true, lowercase: true },
  city: { type: String, trim: true, lowercase: true },
  kebele: { type: String, trim: true, lowercase: true },
  housenumber: { type: String, trim: true },
  phonenumber: Number,
  initialdiganosis: { type: String, trim: true },
});
// const patientSchema = new Schema({
//   regno: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   givenname: { type: String, trim:true, lowercase:true, required: true },
//   middlename: { type: String, trim:true, lowercase:true, required: true },
//   familyname: {type: String, trim:true, lowercase:true},
//   chno: {
//     unique: true,
//     required: true,
//     type: Number,
//   },
//   sex: { type: String, trim:true, enum:["m", "f"] },
//   yearofbirth: { type: Number, required: true },
//   dateofenrolment: {
//     type: Number,
//     default: () => {
//       new Date().getTime();
//     },
//   },
//   zone: { type: String, trim:true, lowercase:true, required: true },
//   woreda: { type: String, trim:true, lowercase:true, required: true },
//   city: { type: String, trim:true, lowercase:true, required: true },
//   kebele: {type: String, trim:true, lowercase:true},
//   housenumber: {type:String, trim:true},
//   phonenumber: Number,
//   initialdiganosis: {type: String, trim:true},
// });

const Patient = mongoose.model("Patient", patientSchema);

export { Patient };
