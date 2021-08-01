import { getCustomRepository } from 'typeorm';
import { AuthDTO } from '../dto/auth.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entities/User';
import { UsersRepositories } from '../repositories/UserRepository';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { TodoItem } from '../entities/TodoItem';
import { jwtSecretKey } from '..';

const createUser = async (userData: CreateUserDTO): Promise<User | null> => {
  const userRepository = getCustomRepository(UsersRepositories);
  try {
    const user = userRepository.create(userData);
    await userRepository.save(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const authenticateUser = async (authData: AuthDTO): Promise<string | null> => {
  const userRepository = getCustomRepository(UsersRepositories);
  try {
    const user = await userRepository.findOne({ email: authData.email });
    if (!user) {
      return null;
    }
    const passwordMatch = await compare(authData.password, user?.password);

    if (!passwordMatch) {
      return null;
    }

    const token = sign(
      {
        email: authData.email
      },
      jwtSecretKey as string,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const getTodoItemsByUser = async (userId: string): Promise<TodoItem[]> => {
  const userRepository = getCustomRepository(UsersRepositories);
  const items = await userRepository.getTodoItems(userId);
  return items;
};

export { createUser, authenticateUser, getTodoItemsByUser };
