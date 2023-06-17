import mongoose, { Schema } from "mongoose";

const VisitsSchema = new Schema({
  regno: {
    type: Number,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
  date: {
    types: Number,
    default: () => {
      new Date().getTime();
    },
  },
});

const Visit = mongoose.model("Patient", VisitsSchema);

export { Visit };
