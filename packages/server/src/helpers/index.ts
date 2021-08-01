import { JwtPayload, verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UserRepository';

class UserHelper {
  static async userExists(email: string): Promise<boolean> {
    const userRepository = getCustomRepository(UsersRepositories);
    const user = await userRepository.findOne({ email });
    if (!user) {
      return false;
    }
    return true;
  }
  static async userAuthorized(token: string, userId: string): Promise<boolean> {
    const context = verify(token, 'supersecret') as JwtPayload;
    const { email, sub } = context;
    const userExists = await this.userExists(email);
    const validUser = userExists && sub === userId;
    return validUser;
  }
}

export { UserHelper };
