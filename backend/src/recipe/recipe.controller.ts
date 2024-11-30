import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  Search,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  @Get()
  async findWithFilters(
    @Query()
    filters: {
      userId?: number;
      name?: string;
      searchString?: string;
      dificuldade?: number;
      isDeleted?: string;
      page?: number;
      limit?: number;
    },
  ) {
    const userId = filters.userId ? Number(filters.userId) : undefined;
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const { recipes, total } = await this.recipeService.findWithFilters({
      userId,
      searchString: filters.searchString,
      dificuldade: +filters.dificuldade,
      isDeleted: filters.isDeleted == 'true',
      skip,
      take: +limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      recipes,
      total,
      totalPages,
      currentPage: page,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.softDelete(+id);
  }
}
