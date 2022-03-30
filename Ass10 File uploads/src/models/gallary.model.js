const mongoose = require("mongoose");

const gallarySchema = new mongoose.Schema(
  {
    user_pictures: [{ type: String, required: true }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Gallary = mongoose.model('gallary', gallarySchema);

module.exports = Gallary;
