import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDTO, UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() data: UsersDTO) {
    return this.usersService.create(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDTO) {
    return this.usersService.login(data);
  }
}
