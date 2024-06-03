import mongoose from "mongoose";
import { Schema } from "mongoose";

const templateNameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("TemplateName", templateNameSchema);
