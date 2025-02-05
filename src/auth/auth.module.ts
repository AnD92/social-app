import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './costants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true, //This means that we don't need to import the JwtModule anywhere else in our application.
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000s' }, //5m
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
