import axiosInstance from "@/services/axiosConfig";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import axios from "axios";

export function createApiUserRepositroy(): UserRepository {
  async function getUser(id: number, token: string): Promise<User | undefined> {
    const response = await axios.get(
      `https://ecommerce-net.azurewebsites.net/api/Account/user?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const user = response.data as User;
    return user;
  }

  async function getAllUsers(): Promise<User[]> {
    const response = await axiosInstance.get(`account/all`, {});
    const users = response.data as User[];
    return users;
  }

  async function getTotalUsers(): Promise<number> {
    const response = await axiosInstance.get(`account/all`, {});
    const user = response.data as User[];
    const totalUser = user.length;
    return totalUser;
  }

  return {
    getUser,
    getTotalUsers,
    getAllUsers,
  };
}
