import recipeInterface from "./recipeInterface";

export default interface userInterface {
  id: number;
  name: string;
  email: string;
  recipes: recipeInterface[];
}
