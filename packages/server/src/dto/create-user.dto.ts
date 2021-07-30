import { IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  private constructor() {}

  static create(user: CreateUserDTO): CreateUserDTO {
    const instance = new CreateUserDTO();
    instance.name = user.name;
    instance.email = user.email;
    instance.password = user.password;
    return instance;
  }
}

export { CreateUserDTO };
