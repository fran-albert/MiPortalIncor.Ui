import { Patient } from "../../domain/Patient";
import { PatientRepository } from "../../domain/PatientRepository";

export function getPatient(patientRepository: PatientRepository) {
  return async (idPatient: number, token: string): Promise<Patient | undefined> => {
    return await patientRepository.getPatient(idPatient, token);
  };
}
