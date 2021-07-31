import { getCustomRepository } from 'typeorm';
import { AuthDTO } from '../dto/auth.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entities/User';
import { UsersRepositories } from '../repositories/UserRepository';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

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
      throw new Error('Incorrect email/password');
    }
    const passwordMatch = await compare(authData.password, user?.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/password');
    }

    const token = sign(
      {
        email: authData.email
      },
      'supersecret',
      {
        subject: user.id,
        expiresIn: '5m'
      }
    );
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { createUser, authenticateUser };
