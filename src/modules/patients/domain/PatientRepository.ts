import { Patient } from "./Patient";

export interface PatientRepository {
  getPatient: (id: number) => Promise<Patient | undefined>;
  getAll: () => Promise<Patient[]>;
  createPatient: (newPatient: Patient) => Promise<Patient | undefined>;
  updatePatient: (patient: Patient, id: number) => Promise<Patient>;
  deletePatient: (idPatient: number) => Promise<Patient>;
  getTotalPatients: () => Promise<number>;
}
