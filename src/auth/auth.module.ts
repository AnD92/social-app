import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './costants';
import { AuthGuard } from './auth.guards';
import { APP_GUARD } from '@nestjs/core';

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
  providers: [AuthService,
    {
      provide: APP_GUARD, //set as global guard for all endpoint
      useClass: AuthGuard,
    }
  ],
})
export class AuthModule {}
