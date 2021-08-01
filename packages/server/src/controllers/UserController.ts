import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { AuthDTO } from '../dto/auth.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { getTodoItemsByUser } from '../services/UserServices';
import { authenticateUser, createUser } from '../services/UserServices';

class UserController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const passwordHash = await hash(password, 8);
    const userData = CreateUserDTO.create({
      name,
      email,
      password: passwordHash
    });
    const newUser = await createUser(userData);

    return response.json(newUser);
  }

  static async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authData = AuthDTO.create({ email, password });
    const token = await authenticateUser(authData);
    return response.json(token);
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
