import mongoose from "mongoose";

const adoptionCollection = "adoptions";

const adoptionSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "pets", required: true },
  adoptedAt: { type: Date, default: Date.now }
});

const adoptionModel = mongoose.model(adoptionCollection, adoptionSchema);

export default adoptionModel;
