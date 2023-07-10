import mongoose, { Schema } from "mongoose";

const VisitsSchema = new Schema({
  regno: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  dateofvisit: {
    type: Number,
    required: true,
  },
});

const Visit = mongoose.model("Visit", VisitsSchema);

export { Visit };
