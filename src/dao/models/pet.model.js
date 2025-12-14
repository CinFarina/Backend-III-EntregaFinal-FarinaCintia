import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  adopted: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", default: null }
});

export default mongoose.model("pets", petSchema);
