export interface CreateRecipeDto {
  name: string;
  ingredientes: string[];
  modoPreparo: string;
  tempoPreparo: number;
  dificuldade: number;
  userId: number;
}
