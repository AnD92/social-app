
import { Exclude } from 'class-transformer';
import { Role } from '../enums/role-user';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  role: Role

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

