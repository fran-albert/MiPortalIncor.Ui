import axiosInstance from "@/services/axiosConfig";
import { Doctor } from "../domain/Doctor";
import { DoctorRepository } from "../domain/DoctorRepository";

export function createApiDoctorRepository(): DoctorRepository {
  async function getDoctor(id: number): Promise<Doctor> {
    const response = await axiosInstance.get(`users/${id}`);
    const doctor = response.data as Doctor;
    return doctor;
  }

  async function getAll(): Promise<Doctor[]> {
    const response = await axiosInstance.get(`users/doctors`);
    const doctors = response.data as Doctor[];
    return doctors;
  }

  return {
    getDoctor,
    getAll,
  };
}
