import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { SafeUserDto } from './dto/safe-user';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  create(createUserDto: Prisma.UserCreateInput): Promise<SafeUserDto> {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  findAll(): Promise<SafeUserDto[]> {
    return this.databaseService.user.findMany({ omit: { password: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: SafeUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
