import mongoose from "mongoose";
import { Schema } from "mongoose";

const templateSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  text: String,
  color: String,
  alt: String,
  width: Number,
  height: Number,
  img: String,
  link: String,
});

const mailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  Sender: {
    type: String,
    required: true,
  },
  Recipient: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  bodyColor: String,
  template: [templateSchema],
});

export default mongoose.model("Mail", mailSchema);
