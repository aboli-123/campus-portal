const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ["lost", "found"], required: true },
    category: String,
    location: String,
    date: Date,
    imageUrl: String,
    status: { type: String, enum: ["open", "claimed", "returned"], default: "open" },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);