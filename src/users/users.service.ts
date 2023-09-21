import { Injectable } from '@nestjs/common';
import { LoginUserDTO, UsersDTO } from './users.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(data: UsersDTO) {
    const { email, name, password } = data;

    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) throw new Error('Usuário já registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: { email, name, password: hashedPassword },
    });

    return user;
  }

  async login(data: LoginUserDTO) {
    const { email, password } = data;

    const userExists = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!userExists) throw new Error('Usuário não cadastrado');

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) throw new Error('Senha ou Email errados');

    return { status: 200, message: 'Autorizado' };
  }
}
