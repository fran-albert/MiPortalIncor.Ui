import { Patient } from "./Patient";

export interface PatientRepository {
  getPatient: (id: number, token: string) => Promise<Patient | undefined>;
  getAll: (token: string) => Promise<Patient[]>;
  createPatient: (
    token: string,
    newPatient: Patient
  ) => Promise<Patient | undefined>;
  // update: (patient: Patient) => Promise<void>;
  // delete: (id: number) => Promise<void>;
}
