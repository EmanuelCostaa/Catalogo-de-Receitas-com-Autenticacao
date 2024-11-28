/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CardRecipeInfo from "@/components/CardRecipeInfo/CardRecipeInfo";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RecipeInfo() {
  const router = useRouter();
  const { recipeId } = router.query;

  const [recipe, setRecipe] = useState<any>(null); // Inicialmente null
  const [user, setUser] = useState<any>(null); // Inicialmente null

  // Buscar receita com base no ID
  useEffect(() => {
    if (recipeId) {
      getRecipe();
    }
  }, [recipeId]);

  const getRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:3001/recipes/${recipeId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar receita: ${response.statusText}`);
      }
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (recipe?.userId) {
      getUser(recipe.userId);
    }
  }, [recipe]);

  const getUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
      }
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <Header />
      <div className="flex mt-10 mb-14 justify-center">
        {recipe && user ? (
          <CardRecipeInfo recipe={recipe} user={user} />
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
