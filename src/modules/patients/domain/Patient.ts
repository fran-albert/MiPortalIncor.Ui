import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { User } from "@/modules/users/domain/User";

export interface Patient extends User {
  userId: number;
  cuil: string;
  dni: string;
  healthPlans: {
    id: number;
    name: string;
    healthInsurance: {
      id: number;
      name: string;
    };
  }[];
}
