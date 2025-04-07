import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["User", "Admin"], // Add more roles if needed
      default: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    code: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || model("User", userSchema);

export default userModel;
