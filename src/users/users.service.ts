import { Injectable } from '@nestjs/common';
import { UsersDTO } from './users.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(data: UsersDTO) {
    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    if (userAlreadyExists) throw new Error('Usuário já registrado');

    const user = await this.prismaService.user.create({ data });

    return user;
  }
}
