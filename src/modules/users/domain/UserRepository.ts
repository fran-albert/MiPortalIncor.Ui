import { User } from './User';

export interface UserRepository {
	getUser: (id: number) => Promise<User | undefined>;
	getAllUsers: () => Promise<User[]>;
	getTotalUsers: () => Promise<number>;
	requestSupport: (request: User) => Promise<void>;
}