import { api } from "@/services/api";

export type CertificateStatus = "Verified" | "In Progress" | "Completed";

export type Certificate = {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  status: CertificateStatus;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CertificateFormData = {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  status: CertificateStatus;
  order: number;
};

export async function getCertificates() {
  const response = await api.get<{ certificates: Certificate[] }>(
    "/certificates"
  );

  return response.data.certificates;
}

export async function createCertificate(payload: CertificateFormData) {
  const response = await api.post<{
    message: string;
    certificate: Certificate;
  }>("/certificates", payload);

  return response.data;
}

export async function updateCertificate(
  id: string,
  payload: CertificateFormData
) {
  const response = await api.put<{
    message: string;
    certificate: Certificate;
  }>(`/certificates/${id}`, payload);

  return response.data;
}

export async function deleteCertificate(id: string) {
  const response = await api.delete<{ message: string }>(
    `/certificates/${id}`
  );

  return response.data;
}