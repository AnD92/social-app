
import { IsEmail, isEnum, IsString } from 'class-validator';

export class MakeUserAdminDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}

export class UpdateUserDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString()
    username: string;
}
