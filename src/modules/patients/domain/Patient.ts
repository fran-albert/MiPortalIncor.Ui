import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { User } from "@/modules/users/domain/User";

export interface Patient extends User {
    cuil: string;
    healthPlans: HealthPlans[];
}
