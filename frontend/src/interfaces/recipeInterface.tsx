export default interface recipeInterface {
  id: number;
  name: string;
  modoPreparo: string;
  tempoPreparo: number;
  dificuldade: number;
  ingredientes: string[];
  userId: number;
}
