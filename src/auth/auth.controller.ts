
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { SafeUserDto } from 'src/users/dto/safe-user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Prisma.UserCreateInput) : Promise<SafeUserDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
