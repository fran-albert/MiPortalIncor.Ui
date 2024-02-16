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

  async function getAll(): Promise<User[]> {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = response.data as User[];
    return users;
  }

  return {
    getUser,
    getAll,
  };
}
