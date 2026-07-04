import mongoose, { Schema, type InferSchemaType } from "mongoose";

const skillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 50,
    },
    icon: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export type Skill = InferSchemaType<typeof skillSchema>;

export default mongoose.model<Skill>("Skill", skillSchema);