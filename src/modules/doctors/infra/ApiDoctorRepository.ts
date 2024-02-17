import axiosInstance from "@/services/axiosConfig";
import { Doctor } from "../domain/Doctor";
import { DoctorRepository } from "../domain/DoctorRepository";

export function createApiDoctorRepository(): DoctorRepository {
  async function getDoctor(id: number): Promise<Doctor> {
    const response = await axiosInstance.get(`users/${id}`);
    const doctor = response.data as Doctor;
    return doctor;
  }

  async function getAllDoctors(token: string): Promise<Doctor[]> {
    const response = await axiosInstance.get(`doctor/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const doctors = response.data as Doctor[];
    return doctors;
  }

  async function createDoctor(
    token: string,
    newDoctor: Doctor
  ): Promise<Doctor> {
    const response = await axiosInstance.post("doctor/create", newDoctor, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const doctor = response.data as Doctor;
    return doctor;
  }

  return {
    getDoctor,
    getAllDoctors,
    createDoctor,
  };
}
