// src/user/dto/create-user.dto.ts
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}
