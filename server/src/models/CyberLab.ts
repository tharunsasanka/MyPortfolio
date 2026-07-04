import mongoose, { Schema, type InferSchemaType } from "mongoose";

const statSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const progressSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { _id: false }
);

const cyberLabSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    rank: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    profileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    stats: {
      type: [statSchema],
      default: [],
    },
    progress: {
      type: [progressSchema],
      default: [],
    },
    learningAreas: {
      type: [String],
      default: [],
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

export type CyberLab = InferSchemaType<typeof cyberLabSchema>;

export default mongoose.model<CyberLab>("CyberLab", cyberLabSchema);