import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { SafeUserDto } from './dto/safe-user';
import * as bcrypt from 'bcrypt';
import { JwtDto } from 'src/auth/dto/jwt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/role-user';
import { makeUserAdminDto } from './dto/update-user';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService, private readonly jwtService: JwtService) { }

  async create(createUserDto: Prisma.UserCreateInput): Promise<JwtDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = { ...createUserDto, password: hashedPassword };
    const user = await this.prisma.user.create({
      data: newUser,
    });
    const payload = { id: user.id, username: user.username, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll(): Promise<SafeUserDto[]> {
    return this.prisma.user.findMany({ omit: { password: true } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  update(id: number, updateUserDto: SafeUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  makeAdmin({email} : makeUserAdminDto) : Promise<SafeUserDto> {
    return this.prisma.user.update({
      where: { email: email},
      data: { role: Role.ADMIN },
      omit: {password: true}
    });
  }
}
