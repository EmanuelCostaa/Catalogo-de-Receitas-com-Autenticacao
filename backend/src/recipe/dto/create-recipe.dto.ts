export interface CreateRecipeDto {
  name: String;
  ingredientes: String[];
  modoPreparo: String;
  tempoPreparo: number;
  dificuldade: String;
  userId: number;
}
