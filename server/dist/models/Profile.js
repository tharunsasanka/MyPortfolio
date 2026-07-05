"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const profileSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Profile", profileSchema);
