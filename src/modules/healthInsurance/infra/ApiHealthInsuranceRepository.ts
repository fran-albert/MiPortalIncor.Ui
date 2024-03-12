import axiosInstance from "@/services/axiosConfig";
import { HealthInsuranceRepository } from "../domain/HealthInsuranceRepository";
import { HealthInsurance } from "../domain/HealthInsurance";

export function createApiHealthInsuranceRepository(): HealthInsuranceRepository {
  async function getAll(): Promise<HealthInsurance[]> {
    const response = await axiosInstance.get(`HealthInsurance/all`);
    const healthInsurance = response.data as HealthInsurance[];
    return healthInsurance;
  }

  return {
    getAll,
  };
}
