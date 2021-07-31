import { IsEmail, IsNotEmpty } from 'class-validator';

class AuthDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  private constructor() {}

  static create(auth: AuthDTO): AuthDTO {
    const instance = new AuthDTO();
    instance.email = auth.email;
    instance.password = auth.password;
    return instance;
  }
}

export { AuthDTO };
