import mongoose, { Schema } from "mongoose";

const VisitsSchema = new Schema({
  regno: {
    type: Number,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  dateofvisit: {
    type: Number,
    required: true,
    default: () => new Date().getTime(),
  },
});

const Visit = mongoose.model("Visit", VisitsSchema);

export { Visit };
