import mongoose from "mongoose";

const petCollection = "pets";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  adopted: { type: Boolean, default: false },
});

const petModel = mongoose.model(petCollection, petSchema);

export default petModel;
