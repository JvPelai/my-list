import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AuthDTO } from '../dto/auth.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersRepositories } from '../repositories/UserRepository';
import { getTodoItemsByUser } from '../services/UserServices';
import { authenticateUser, createUser } from '../services/UserServices';

class UserController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const userRepository = getCustomRepository(UsersRepositories);
    try {
      const userAlreadyExists = await userRepository.userExists(email);
      if (userAlreadyExists) {
        return response.status(409).json('User already exists');
      }
      const passwordHash = await hash(password, 8);
      const userData = CreateUserDTO.create({
        name,
        email,
        password: passwordHash
      });
      const newUser = await createUser(userData);

      return response.json(newUser).status(201);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authData = AuthDTO.create({ email, password });
    try {
      const token = await authenticateUser(authData);
      return response.status(200).json(token);
    } catch (error) {
      return response.json(error);
    }
  }

  static async getUserTodoItems(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user } = request.params;
    const token = request.headers['authorization'];
    const items = await getTodoItemsByUser(user, token as string);
    return response.json(items);
  }
}

export { UserController };
