export interface CreateRecipeDto {
  name: string;
  ingredientes: string[];
  modoPreparo: string;
  tempoPreparo: number;
  dificuldade: string;
  userId: number;
}
