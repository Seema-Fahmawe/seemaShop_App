import mongoose, { model, Schema, Types } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 80,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "not_active"],
    },
    image: {
      type: Object,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const categoryModel =
  mongoose.models.Category || model("Category", categorySchema);
export default categoryModel;
