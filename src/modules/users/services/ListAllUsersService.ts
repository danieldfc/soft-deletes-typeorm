import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class ListAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }
}

export default ListAllUsersService;
