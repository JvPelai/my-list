import { getCustomRepository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entities/User';
import { UsersRepositories } from '../repositories/UserRepository';

const createUser = async (userData: CreateUserDTO): Promise<User | null> => {
  try {
    const userRepository = getCustomRepository(UsersRepositories);
    const user = userRepository.create(userData);
    await userRepository.save(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { createUser };
