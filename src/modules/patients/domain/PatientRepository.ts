import { Patient } from "./Patient";

export interface PatientRepository {
  getPatient: (id: number, token: string) => Promise<Patient | undefined>;
  getAll: () => Promise<Patient[]>;
  createPatient: (newPatient: Patient) => Promise<Patient | undefined>;
  // update: (patient: Patient) => Promise<void>;
  deletePatient: (idPatient: number) => Promise<Patient>;
  getTotalPatients: () => Promise<number>;
}
