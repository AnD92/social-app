import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma} from '@prisma/client';
import { SafeUserDto } from './dto/safe-user';
import { Public } from './../auth/public.decorator';
import { createUserDto } from './dto/create-user';
import { JwtDto } from 'src/auth/dto/jwt';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post()
  create(@Body(new ValidationPipe()) createUserDto: createUserDto): Promise<JwtDto> {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll(): Promise<SafeUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: SafeUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
