import { CreateRecipeDto } from '../../recipe/dto/create-recipe.dto';

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  Recipes: CreateRecipeDto[];
}
