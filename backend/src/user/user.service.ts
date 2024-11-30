import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        Recipes: {
          create: createUserDto.Recipes,
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany({
      include: { Recipes: true },
    });
  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { Recipes: true },
    });
  }

  async update(
    id: number,
    updateUserDto: {
      id: number;
      name?: string;
      email?: string;
    },
  ) {
    return this.prismaService.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
