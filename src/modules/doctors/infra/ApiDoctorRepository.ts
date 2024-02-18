import axiosInstance from "@/services/axiosConfig";
import { Doctor } from "../domain/Doctor";
import { DoctorRepository } from "../domain/DoctorRepository";

export function createApiDoctorRepository(): DoctorRepository {
  async function getDoctor(id: number): Promise<Doctor> {
    const response = await axiosInstance.get(`users/${id}`);
    const doctor = response.data as Doctor;
    return doctor;
  }

  async function getAllDoctors(): Promise<Doctor[]> {
    const response = await axiosInstance.get(`doctor/all`);
    const doctors = response.data as Doctor[];
    return doctors;
  }

  async function getTotalDoctors(): Promise<number> {
    const response = await axiosInstance.get(`doctor/all`, {});
    const doctor = response.data as Doctor[];
    const totalDoctor = doctor.length;
    return totalDoctor;
}

  async function createDoctor(newDoctor: Doctor): Promise<Doctor> {
    const response = await axiosInstance.post("doctor/create", newDoctor);
    const doctor = response.data as Doctor;
    return doctor;
  }

  async function deleteDoctor(idDoctor: number): Promise<Doctor> {
    const response = await axiosInstance.delete(`doctor/${idDoctor}`);
    const doctor = response.data as Doctor;
    return doctor;
  }

  return {
    getDoctor,
    getAllDoctors,
    createDoctor,
    getTotalDoctors,
    deleteDoctor,
  };
}
