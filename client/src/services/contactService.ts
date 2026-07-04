import { api } from "@/services/api";

export type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(payload: ContactFormData) {
  const response = await api.post<{
    message: string;
    contactMessage: ContactMessage;
  }>("/contact", payload);

  return response.data;
}

export async function getContactMessages() {
  const response = await api.get<{ messages: ContactMessage[] }>("/contact");
  return response.data.messages;
}

export async function markContactMessageAsRead(id: string) {
  const response = await api.patch<{
    message: string;
    contactMessage: ContactMessage;
  }>(`/contact/${id}/read`);

  return response.data;
}

export async function deleteContactMessage(id: string) {
  const response = await api.delete<{ message: string }>(`/contact/${id}`);
  return response.data;
}