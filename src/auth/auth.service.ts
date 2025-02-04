
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user || await bcrypt.compare(pass, user.password))
            throw new UnauthorizedException();
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return "ok";
    }
}
