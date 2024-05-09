import { Address } from "@/modules/address/domain/Address";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";

export interface User {
  id: number;
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date | string | undefined;
  phoneNumber: string;
  photo: string;
  token?: string;
  address: Address;
  userName: string;
  userId: number;
  registrationDate: Date | string | undefined;
  roles: string[];
  priority: string;
  module: string;
  description: string;
  currentPassword: string;
  password: string;
  registerBy: string;
  newPassword: string;
  code: string;
  confirmPassword: string;
  registeredById: number;
  // healthPlans: HealthPlans[]
  // healtInsurace: HealthInsurance[];
}
