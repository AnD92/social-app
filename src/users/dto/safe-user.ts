import { Prisma } from '@prisma/client';

export class SafeUserDto implements Omit<Prisma.UserCreateInput, 'password'> {
  id: number;
  username: string;
  email: string;
}

