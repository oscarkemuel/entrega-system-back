import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { UsersRepository } from "../repositories/UsersRepository";

class UserService {
  private usersRepository = new UsersRepository();

  async index() {
    const users = await this.usersRepository.index();
    
    return users;
  }

  async create(user: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const newUser = await this.usersRepository.create(user);

    return newUser;
  }

  async show(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  }
}

export { UserService };