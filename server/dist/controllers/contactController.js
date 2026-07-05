"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactMessage = createContactMessage;
exports.getContactMessages = getContactMessages;
exports.markContactMessageAsRead = markContactMessageAsRead;
exports.markContactMessageAsUnread = markContactMessageAsUnread;
exports.deleteContactMessage = deleteContactMessage;
const ContactMessage_1 = __importDefault(require("../models/ContactMessage"));
async function createContactMessage(req, res) {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            message: "Please provide name, email, subject, and message.",
        });
    }
    const contactMessage = await ContactMessage_1.default.create({
        name,
        email,
        subject,
        message,
        isRead: false,
    });
    return res.status(201).json({
        message: "Message sent successfully.",
        contactMessage,
    });
}
async function getContactMessages(_req, res) {
    const messages = await ContactMessage_1.default.find().sort({
        isRead: 1,
        createdAt: -1,
    });
    return res.json({ messages });
}
async function markContactMessageAsRead(req, res) {
    const message = await ContactMessage_1.default.findById(req.params.id);
    if (!message) {
        return res.status(404).json({
            message: "Contact message not found.",
        });
    }
    message.isRead = true;
    await message.save();
    return res.json({
        message: "Message marked as read.",
        contactMessage: message,
    });
}
async function markContactMessageAsUnread(req, res) {
    const message = await ContactMessage_1.default.findById(req.params.id);
    if (!message) {
        return res.status(404).json({
            message: "Contact message not found.",
        });
    }
    message.isRead = false;
    await message.save();
    return res.json({
        message: "Message marked as unread.",
        contactMessage: message,
    });
}
async function deleteContactMessage(req, res) {
    const message = await ContactMessage_1.default.findByIdAndDelete(req.params.id);
    if (!message) {
        return res.status(404).json({
            message: "Contact message not found.",
        });
    }
    return res.json({
        message: "Message deleted successfully.",
    });
}
