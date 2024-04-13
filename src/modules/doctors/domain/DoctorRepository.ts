import { Doctor } from "./Doctor";

export interface DoctorRepository {
  getDoctor: (id: number) => Promise<Doctor>;
  getAllDoctors: () => Promise<Doctor[]>;
  createDoctor: (newDoctor: Doctor) => Promise<Doctor | undefined>;
  updateDoctor: (doctor: Doctor, id: number) => Promise<Doctor>;
  // delete: (id: number) => Promise<void>;
  deleteDoctor: (idDoctor: number) => Promise<Doctor>;
  getTotalDoctors: () => Promise<number>;
}
