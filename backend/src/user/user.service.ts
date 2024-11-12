import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // Cria um usuário junto com suas receitas
  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
        Recipes: {
          create: createUserDto.Recipes,
        },
      },
      include: { Recipes: true }, // Inclui as receitas no retorno
    });
  }

  // Lista todos os usuários com suas receitas
  async findAll() {
    return this.prismaService.user.findMany({
      include: { Recipes: true },
    });
  }

  // Busca um usuário específico por ID, incluindo suas receitas
  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { Recipes: true },
    });
  }

  // Atualiza os dados de um usuário e suas receitas, se necessário
  async update(id: number, updateUserDto: UpdateUserDto) {
    // Atualiza o usuário
    return this.prismaService.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        password: updateUserDto.password,
        name: updateUserDto.name,
        Recipes: updateUserDto.Recipes
          ? {
              deleteMany: {}, // Remove as receitas existentes
              create: updateUserDto.Recipes, // Adiciona as receitas do DTO
            }
          : undefined,
      },
      include: { Recipes: true },
    });
  }

  // Remove um usuário e suas receitas relacionadas
  async remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
