import { Prisma } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class createUserDto implements Prisma.UserCreateInput {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    @IsString()
    password: string;
    @IsString()
    username: string;
}