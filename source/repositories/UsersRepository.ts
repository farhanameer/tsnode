import { UsersModel } from "@models/User";
import { IUsersRepository } from "./interfaces/user.interface";
import { IUser } from "@interfaces/user";

export class UsersRepository implements IUsersRepository {
  private readonly database = UsersModel;

  public async findByEmail(email: string): Promise<any> {
    return console.log(email);
  }
}
