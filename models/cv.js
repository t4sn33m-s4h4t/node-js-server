const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    originalname: {
      type: String,
      required: true,
      unique: false,
    }
  }
);

module.exports = mongoose.model("CV", cvSchema);
