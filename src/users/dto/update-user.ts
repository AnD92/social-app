
import { IsEmail, isEnum, IsString } from 'class-validator';

export class makeUserAdminDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}