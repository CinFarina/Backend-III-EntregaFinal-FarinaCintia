import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pets" }]
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
