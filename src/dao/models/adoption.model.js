import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "pets" },
  adoptedAt: { type: Date, default: Date.now }
});

export default mongoose.model("adoptions", adoptionSchema);
