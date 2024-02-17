import { Doctor } from "../../domain/Doctor";
import { DoctorRepository } from "../../domain/DoctorRepository";

export function getAllDoctors(doctorRepository: DoctorRepository) {
  return async (token: string): Promise<Doctor[]> => {
    return await doctorRepository.getAllDoctors(token);
  };
}
