import { Address } from "@/modules/address/domain/Address";

export interface User {
  id: number;
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: boolean;
  phoneNumber: string;
  photo: string;
  token?: string;
  address: Address;
  userName: string;
  // healthPlans: HealthPlan[];
}
