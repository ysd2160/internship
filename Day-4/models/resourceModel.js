import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["income", "expense", "task", "note", "other"],
      default: "other",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    amount: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
