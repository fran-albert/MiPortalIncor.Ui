import { Doctor } from "../../domain/Doctor";
import { DoctorRepository } from "../../domain/DoctorRepository";

export function createDoctor(doctorRepository: DoctorRepository) {
  return async (
    token: string,
    newDoctor: Doctor
  ): Promise<Doctor | undefined> => {
    return await doctorRepository.createDoctor(token, newDoctor);
  };
}
