import { Patient } from "../../domain/Patient";
import { PatientRepository } from "../../domain/PatientRepository";

export function createPatient(patientRepository: PatientRepository) {
  return async (
    token: string,
    newPatient: Patient
  ): Promise<Patient | undefined> => {
    return await patientRepository.createPatient(token, newPatient);
  };
}
