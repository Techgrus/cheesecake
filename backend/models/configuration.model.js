import mongoose from "mongoose";

const configurationSchema = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const configuration = mongoose.model("Configuration", configurationSchema);
export default configuration;
