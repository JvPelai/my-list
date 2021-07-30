import { Request, Response } from 'express';
import { CreateUserDTO } from '../../dto/create-user.dto';

class CreateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const newUser = CreateUserDTO.create({ name, email, password });

    return response.json(newUser);
  }
}

export { CreateUserController };
