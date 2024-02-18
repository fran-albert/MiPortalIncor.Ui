import { User } from './User';

export interface UserRepository {
	getUser: (id: number, token: string) => Promise<User | undefined>;
	getAllUsers: () => Promise<User[]>;
	getTotalUsers: () => Promise<number>;
}