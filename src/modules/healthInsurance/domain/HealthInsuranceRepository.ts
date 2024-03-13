import { HealthInsurance } from "./HealthInsurance";

export interface HealthInsuranceRepository {
  getAll: () => Promise<HealthInsurance[]>;
}
