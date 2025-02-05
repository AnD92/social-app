
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SafeUserDto } from 'src/users/dto/safe-user';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/jwt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<JwtDto> {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new NotFoundException();
        const isValid = await bcrypt.compare(pass, user.password)
        if (!isValid)
            throw new UnauthorizedException();
        const payload = { sub: user.id, username: user.username, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
