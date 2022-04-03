import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  passwords: {
    type: [
      { idx: Number, username: String, password: String, website: String },
    ],
    default: [],
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
