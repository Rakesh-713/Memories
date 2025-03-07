import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, reqiured: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
