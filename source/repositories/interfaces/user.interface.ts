import { IUser } from "@interfaces/user";

export interface IUsersRepository {
  findByEmail(email: string): Promise<any>;
}
