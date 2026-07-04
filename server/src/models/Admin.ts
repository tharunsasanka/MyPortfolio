import bcrypt from "bcryptjs";
import mongoose, { Schema, type InferSchemaType } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export type Admin = InferSchemaType<typeof adminSchema>;

export type AdminDocument = mongoose.HydratedDocument<Admin> & {
  comparePassword(candidatePassword: string): Promise<boolean>;
};

export default mongoose.model<Admin>("Admin", adminSchema);