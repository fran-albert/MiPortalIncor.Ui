import { Patient } from "./Patient";

export interface PatientRepository {
  getPatient: (id: number, token: string) => Promise<Patient | undefined>;
  getAll: (token: string) => Promise<Patient[]>;
  // create: (patient: Patient) => Promise<void>;
  // update: (patient: Patient) => Promise<void>;
  // delete: (id: number) => Promise<void>;
}
