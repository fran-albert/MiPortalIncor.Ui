import { Doctor } from "./Doctor";

export interface DoctorRepository {
  getDoctor: (id: number) => Promise<Doctor>;
  getAllDoctors: () => Promise<Doctor[]>;
  createDoctor: (newDoctor: Doctor) => Promise<Doctor | undefined>;
  // update: (patient: Patient) => Promise<void>;
  // delete: (id: number) => Promise<void>;
  deleteDoctor: (idDoctor: number) => Promise<Doctor>;
  getTotalDoctors: () => Promise<number>;
}
