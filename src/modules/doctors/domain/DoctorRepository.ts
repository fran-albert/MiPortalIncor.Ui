import { Doctor } from "./Doctor";

export interface DoctorRepository {
  getDoctor: (id: number) => Promise<Doctor>;
  getAll: () => Promise<Doctor[]>;
  // create: (patient: Patient) => Promise<void>;
  // update: (patient: Patient) => Promise<void>;
  // delete: (id: number) => Promise<void>;
}
