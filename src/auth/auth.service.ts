
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SafeUserDto } from 'src/users/dto/safe-user';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signIn(email: string, pass: string): Promise<SafeUserDto> {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new NotFoundException();
        const isValid = await bcrypt.compare(pass, user.password)
        if (!isValid)
            throw new UnauthorizedException();
        // TODO: Generate a JWT and return it here
        // instead of the user object
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
