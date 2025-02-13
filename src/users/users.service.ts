import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtDto } from 'src/auth/dto/jwt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/role-user';
import { MakeUserAdminDto, UpdateUserDto } from './dto/update-user';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService, private readonly jwtService: JwtService) { }

  async create(createUserDto: Prisma.UserCreateInput): Promise<JwtDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = { ...createUserDto, password: hashedPassword };
    const user = await this.prisma.user.create({
      data: newUser,
    });
    const payload = { id: user.id, username: user.username, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findAll(limit: number = 10, offset: number = 0, searchTerm?: string, role?: string): Promise<UserEntity[]> {

    const where = {
      AND: [
        searchTerm
          ? {
            OR: [
              { username: { contains: searchTerm, mode: 'insensitive' } },
              { email: { contains: searchTerm, mode: 'insensitive' } },
            ],
          }
          : {},
        role ? { role: { equals: role } } : {},
      ],
    };

    const users = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
    });

    return users.map(user => plainToInstance(UserEntity, user))
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    }

    return plainToInstance(UserEntity, user);  // Restituisci l'istanza della tua UserEntity
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = this.prisma.user.update({
      where: { id },
      data: updateUserDto
    });
    return plainToInstance(UserEntity, user)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async makeAdmin({ email }: MakeUserAdminDto): Promise<UserEntity> {
    const user = this.prisma.user.update({
      where: { email },
      data: { role: Role.ADMIN },
    });
    return plainToInstance(UserEntity, user)
  }
}
