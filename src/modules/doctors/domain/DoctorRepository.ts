import { Doctor } from "./Doctor";

export interface DoctorRepository {
  getDoctor: (id: number) => Promise<Doctor>;
  getAllDoctors: (token: string) => Promise<Doctor[]>;
  createDoctor: (
    token: string,
    newDoctor: Doctor
  ) => Promise<Doctor | undefined>;
  // update: (patient: Patient) => Promise<void>;
  // delete: (id: number) => Promise<void>;
}
