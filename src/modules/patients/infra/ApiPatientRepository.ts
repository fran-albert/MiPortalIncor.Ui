import axiosInstance from "@/services/axiosConfig";
import { Patient } from "../domain/Patient";
import { PatientRepository } from "../domain/PatientRepository";
import axios from "axios";

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

  async function getAll(token: string): Promise<Patient[]> {
    // const response = await axiosInstance.get(`users/patients`);
    // const patients = response.data as Patient[];
    // return patients;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}patient/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const patient = response.data as Patient[];
    return patient;
  }

  return {
    getPatient,
    getAll,
  };
}
