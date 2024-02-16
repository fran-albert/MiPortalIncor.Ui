import { User } from './User';

export interface UserRepository {
	getUser: (id: number, token: string) => Promise<User | undefined>;
	getAll: () => Promise<User[]>;
}