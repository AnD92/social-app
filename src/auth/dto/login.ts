import { IsEmail, IsString } from 'class-validator';

export class loginDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @IsString()
    password: string;
}