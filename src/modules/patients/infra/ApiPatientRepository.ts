import axiosInstance from "@/services/axiosConfig";
import { Patient } from "../domain/Patient";
import { PatientRepository } from "../domain/PatientRepository";

export function createApiPatientRepository(): PatientRepository {
  async function getPatient(
    id: number,
    token: string
  ): Promise<Patient | undefined> {
    const response = await axiosInstance.get(`Account/user?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const patient = response.data as Patient;
    return patient;
  }

  async function getAll(): Promise<Patient[]> {
    const response = await axiosInstance.get(`Patient/all`, {});
    const patient = response.data as Patient[];
    return patient;
  }

  async function getTotalPatients(): Promise<number> {
      const response = await axiosInstance.get(`Patient/all`, {});
      const patient = response.data as Patient[];
      const totalPatient = patient.length;
      return totalPatient;
  }

  async function createPatient(newPatient: Patient): Promise<Patient> {
    const response = await axiosInstance.post("patient/create", newPatient);
    const patient = response.data as Patient;
    return patient;
  }

  async function deletePatient(idPatient: number): Promise<Patient> {
    const response = await axiosInstance.delete(`Patient/${idPatient}`);
    const patient = response.data as Patient;
    return patient;
  }

  return {
    getPatient,
    getAll,
    createPatient,
    deletePatient,
    getTotalPatients,
  };
}
