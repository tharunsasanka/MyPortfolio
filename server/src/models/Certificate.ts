import mongoose, { Schema, type InferSchemaType } from "mongoose";

const certificateSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    issueDate: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    credentialId: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },
    verificationUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Verified", "In Progress", "Completed"],
      default: "Completed",
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

export type Certificate = InferSchemaType<typeof certificateSchema>;

export default mongoose.model<Certificate>("Certificate", certificateSchema);