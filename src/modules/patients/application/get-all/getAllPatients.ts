import { Patient } from "../../domain/Patient";
import { PatientRepository } from "../../domain/PatientRepository";

export function getAllPatients(patientRepository: PatientRepository) {
  return async (token: string): Promise<Patient[]> => {
    return await patientRepository.getAll(token);
  };
}
