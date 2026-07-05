import mongoose, { Schema, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    longDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
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
      default: "Completed",
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