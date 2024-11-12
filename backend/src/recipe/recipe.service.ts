import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly pismaService: PrismaService) {}

  create(createRecipeDto: CreateRecipeDto) {
    return this.pismaService.recipe.create({
      data: createRecipeDto,
    });
  }

  findAll() {
    return this.pismaService.recipe.findMany();
  }

  findOne(id: number) {
    return this.pismaService.recipe.findUnique({
      where: { id },
    });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.pismaService.recipe.update({
      where: { id },
      data: updateRecipeDto,
    });
  }

  remove(id: number) {
    return this.pismaService.recipe.delete({
      where: { id },
    });
  }
}
