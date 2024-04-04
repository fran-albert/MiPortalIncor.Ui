import { Patient } from "./Patient";

export interface PatientRepository {
  getPatient: (id: number) => Promise<Patient | undefined>;
  getAll: () => Promise<Patient[]>;
  createPatient: (newPatient: FormData) => Promise<Patient | undefined>;
  updatePatient: (patient: FormData, id: number) => Promise<Patient>;
  deletePatient: (idPatient: number) => Promise<Patient>;
  getTotalPatients: () => Promise<number>;
}
