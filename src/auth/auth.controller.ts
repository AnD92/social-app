
import { Body, Controller, Post, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SafeUserDto } from 'src/users/dto/safe-user';
import { loginDto } from './dto/login';
import { JwtDto } from './dto/jwt';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body(new ValidationPipe()) signInDto: loginDto) : Promise<JwtDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
