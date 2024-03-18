import { Patient } from "../../domain/Patient";
import { PatientRepository } from "../../domain/PatientRepository";

export function createPatient(patientRepository: PatientRepository) {
  return async (newPatient: FormData): Promise<Patient | undefined> => {
    return await patientRepository.createPatient(newPatient);
  };
}
