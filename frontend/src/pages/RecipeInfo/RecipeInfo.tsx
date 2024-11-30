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
  const [recipeUser, setRecipeUser] = useState<any>(null); // Inicialmente null
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);

      const userId = userData.sub;
      const response = await fetch(`http://localhost:3001/user/${userId}`);
      const data = await response.json();
      setUser(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
      getRecipeUser(recipe.userId);
    }
  }, [recipe]);

  const getRecipeUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
      }
      const data = await response.json();
      setRecipeUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="flex mt-10 mb-14 justify-center">
          {recipe && recipeUser ? (
            <CardRecipeInfo
              recipe={recipe}
              user={user}
              recipeUser={recipeUser}
            />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
