import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { User } from "@/modules/users/domain/User";

interface SpecialityContainer {
  speciality: Speciality;
}

export interface Doctor extends User {
  matricula: string;
  specialities: SpecialityContainer[];
  healthPlans: HealthPlans[];
}
