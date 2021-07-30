import { Request, Response } from 'express';
import { CreateUserDTO } from '../dto/create-user.dto';
import { createUser } from '../services/UserServices';

class UserController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const userData = CreateUserDTO.create({ name, email, password });
    const newUser = await createUser(userData);

    return response.json(newUser);
  }
}

export { UserController };
