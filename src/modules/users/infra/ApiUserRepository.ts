import axiosInstance from "@/services/axiosConfig";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import axios from "axios";

export function createApiUserRepositroy(): UserRepository {
  async function getUser(id: number): Promise<User | undefined> {
    const response = await axiosInstance.get(`Account/user?id=${id}`);
    const user = response.data as User;
    return user;
  }

  async function getAllUsers(): Promise<User[]> {
    const response = await axiosInstance.get(`account/all`);
    const users = response.data as User[];
    return users;
  }

  async function requestSupport(request: User): Promise<void> {
    const response = await axiosInstance.post(`account/support`, request);
    const users = response.data;
    return users;
  }

  async function getTotalUsers(): Promise<number> {
    const response = await axiosInstance.get(`account/all`);
    const user = response.data as User[];
    const totalUser = user.length;
    return totalUser;
  }

  return {
    getUser,
    getTotalUsers, requestSupport,
    getAllUsers,
  };
}
