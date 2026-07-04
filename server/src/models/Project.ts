import mongoose, { Schema, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    longDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    liveUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Planning"],
      default: "Planning",
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

export type Project = InferSchemaType<typeof projectSchema>;

export default mongoose.model<Project>("Project", projectSchema);