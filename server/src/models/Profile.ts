import mongoose, { Schema, type InferSchemaType } from "mongoose";

const profileSchema = new Schema(
  {
    // Hero section
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    badgeText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    codeText: {
      type: String,
      default: "<Hello World />",
      trim: true,
      maxlength: 120,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    highlightedHeadline: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    heroDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 800,
    },

    // Hero buttons / links
    githubUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    linkedinUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    cvUrl: {
      type: String,
      default: "/cv.pdf",
      trim: true,
    },

    // Hero status details
    statusText: {
      type: String,
      default: "Open to Projects",
      trim: true,
      maxlength: 120,
    },
    contactText: {
      type: String,
      default: "Available",
      trim: true,
      maxlength: 120,
    },
    learningText: {
      type: String,
      default: "24/7 Mode",
      trim: true,
      maxlength: 120,
    },
    techStackText: {
      type: String,
      default: "React • Node.js • MongoDB • Cybersecurity",
      trim: true,
      maxlength: 250,
    },

    // Hero stats
    projectsStat: {
      type: String,
      default: "10+",
      trim: true,
      maxlength: 30,
    },
    projectsLabel: {
      type: String,
      default: "Projects",
      trim: true,
      maxlength: 80,
    },
    domainsStat: {
      type: String,
      default: "4+",
      trim: true,
      maxlength: 30,
    },
    domainsLabel: {
      type: String,
      default: "Tech Domains",
      trim: true,
      maxlength: 80,
    },
    learningStat: {
      type: String,
      default: "24/7",
      trim: true,
      maxlength: 30,
    },
    learningLabel: {
      type: String,
      default: "Learning Mode",
      trim: true,
      maxlength: 80,
    },

    // About section
    aboutEyebrow: {
      type: String,
      default: "About Me",
      trim: true,
      maxlength: 100,
    },
    aboutTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    aboutDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    aboutSecondDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1500,
    },

    location: {
      type: String,
      default: "Sri Lanka",
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      default: "tharunsasanka1234@gmail.com",
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    // Optional future image support
    profileImageUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export type Profile = InferSchemaType<typeof profileSchema>;

export default mongoose.model<Profile>("Profile", profileSchema);