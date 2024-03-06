export interface User {
  id: number;
  userId: number;
  user:{
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    photo: string;
    lastActivityDate: string;
    lastLoginDate: string;
    token?: string;
  }
}
