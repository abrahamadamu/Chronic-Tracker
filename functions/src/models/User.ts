import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  givenname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  middlename: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const User = model("User", UserSchema);

export { User };
