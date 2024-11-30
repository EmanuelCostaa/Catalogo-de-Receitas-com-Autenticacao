import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createRecipeDto: CreateRecipeDto) {
    return this.prismaService.recipe.create({
      data: createRecipeDto,
    });
  }

  findAll() {
    return this.prismaService.recipe.findMany();
  }

  findOne(id: number) {
    return this.prismaService.recipe.findUnique({
      where: { id },
    });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.prismaService.recipe.update({
      where: { id },
      data: updateRecipeDto,
    });
  }

  remove(id: number) {
    return this.prismaService.recipe.delete({
      where: { id },
    });
  }
  async softDelete(id: number) {
    return this.prismaService.recipe.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
  async findWithFilters(filters: {
    userId?: number;
    searchString?: string;
    dificuldade?: number;
    isDeleted?: boolean;
    skip?: number;
    take?: number;
  }) {
    const [recipes, total] = await Promise.all([
      this.prismaService.recipe.findMany({
        skip: filters.skip,
        take: filters.take,
        where: {
          ...(filters.userId && { userId: filters.userId }),
          ...(filters.dificuldade && { dificuldade: filters.dificuldade }),
          ...(filters.isDeleted !== undefined && {
            isDeleted: filters.isDeleted,
          }),
          ...(filters.searchString && {
            OR: [
              { name: { contains: filters.searchString, mode: 'insensitive' } },
              {
                modoPreparo: {
                  contains: filters.searchString,
                  mode: 'insensitive',
                },
              },
              { ingredientes: { hasSome: [filters.searchString] } },
            ],
          }),
        },
      }),
      this.prismaService.recipe.count({
        where: {
          ...(filters.userId && { userId: filters.userId }),
          ...(filters.dificuldade && { dificuldade: filters.dificuldade }),
          ...(filters.isDeleted !== undefined && {
            isDeleted: filters.isDeleted,
          }),
          ...(filters.searchString && {
            OR: [
              { name: { contains: filters.searchString, mode: 'insensitive' } },
              {
                modoPreparo: {
                  contains: filters.searchString,
                  mode: 'insensitive',
                },
              },
              { ingredientes: { hasSome: [filters.searchString] } },
            ],
          }),
        },
      }),
    ]);

    return {
      recipes,
      total,
    };
  }
}
