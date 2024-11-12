import { CreateRecipeDto } from './create-recipe.dto';

export interface UpdateRecipeDto extends Partial<CreateRecipeDto> {
  id: number;
}
