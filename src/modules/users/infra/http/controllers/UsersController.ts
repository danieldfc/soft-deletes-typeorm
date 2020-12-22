import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAllUsersService from '@modules/users/services/ListAllUsersService';
import ShowUserService from '@modules/users/services/ShowUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const listAllUsers = container.resolve(ListAllUsersService);

    const users = await listAllUsers.execute();

    return response.json(classToClass(users));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({
      userId: id,
    });

    return response.json(classToClass(user));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.status(204).send();
  }
}
