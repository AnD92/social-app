import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from './../auth/public.decorator';
import { createUserDto } from './dto/create-user';
import { JwtDto } from 'src/auth/dto/jwt';
import { MakeUserAdminDto, UpdateUserDto } from './dto/update-user';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from './enums/role-user';
import { RolesGuard } from 'src/auth/roles.guards';
import { UserEntity } from './entities/user.entity';


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
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('searchTerm') searchTerm: string = '',
    @Query('role') role: string = '',
  ): Promise<UserEntity[]> {
    return this.usersService.findAll(+limit, +offset, searchTerm, role);
  }

  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(RolesGuard)
  @Patch('makeAdmin')
  makeAdmin(@Body(new ValidationPipe()) makeUserAdminDto: MakeUserAdminDto): Promise<UserEntity> {
    return this.usersService.makeAdmin({ ...makeUserAdminDto });
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

}
