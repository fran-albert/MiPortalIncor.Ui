import axiosInstance from "@/services/axiosConfig";
import { Patient } from "../domain/Patient";
import { PatientRepository } from "../domain/PatientRepository";
import axios from "axios";

export function createApiPatientRepository(): PatientRepository {
  async function getPatient(id: number): Promise<Patient | undefined> {
    const response = await axiosInstance.get(`Patient/${id}`);
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

  async function createPatient(newPatient: FormData): Promise<Patient> {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}Patient/create`,
      newPatient,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const patient = response.data as Patient;
    return patient;
  }

  async function updatePatient(
    updatePatient: FormData,
    idPatient: number
  ): Promise<Patient> {
    const response = await axiosInstance.put(
      `Patient/${idPatient}`,
      updatePatient,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
    updatePatient,
    deletePatient,
    getTotalPatients,
  };
}
