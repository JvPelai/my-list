import { hash } from 'bcryptjs';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { AuthDTO } from '../dto/auth.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserHelper } from '../helpers';
import { getTodoItemsByUser } from '../services/UserServices';
import { authenticateUser, createUser } from '../services/UserServices';

class UserController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const userAlreadyExists = await UserHelper.userExists(email);
      if (userAlreadyExists) {
        return response.status(400).json('User already exists');
      }
      const passwordHash = await hash(password, 8);
      const userData = CreateUserDTO.create({
        name,
        email,
        password: passwordHash
      });
      const details = await validate(userData);
      if (details.length > 0) {
        return response.status(400).json(details);
      }
      const newUser = await createUser(userData);

      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authData = AuthDTO.create({ email, password });
    const details = await validate(authData);
    if (details.length > 0) {
      return response.status(400).json(details);
    }
    try {
      const context = await authenticateUser(authData);
      if (!context) {
        return response.status(401).json('Incorrect email/password');
      }
      return response.status(200).json(context);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async getUserTodoItems(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user } = request.params;
    const token = request.headers['authorization'] as string;
    if (!token) {
      return response.status(401).json('You must provide an access token');
    }
    try {
      const userAuthorized = await UserHelper.userAuthorized(token, user);
      if (!userAuthorized) {
        return response.status(401).json('Invalid user');
      }
      const items = await getTodoItemsByUser(user);
      return response.json(items);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { UserController };
