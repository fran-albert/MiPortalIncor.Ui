import { Patient } from "../../domain/Patient";
import { PatientRepository } from "../../domain/PatientRepository";

export function updatePatient(patientRepository: PatientRepository) {
  return async (updatePatient: Patient, id: number): Promise<Patient> => {
    return await patientRepository.updatePatient(updatePatient, id);
  };
}
