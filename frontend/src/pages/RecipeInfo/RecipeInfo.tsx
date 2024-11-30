/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CardRecipeInfo from "@/components/CardRecipeInfo/CardRecipeInfo";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import recipeInterface from "@/interfaces/recipeInterface";
import userInterface from "@/interfaces/userInterface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RecipeInfo() {
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState<recipeInterface>({} as recipeInterface);
  const [recipeUser, setRecipeUser] = useState<userInterface | null>(null);
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);

      try {
        const userId = userData.sub;
        const response = await fetch(`http://localhost:3001/user/${userId}`);
        const data = await response.json();
        setUser(data);
        if (!response.ok) {
          throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
        }
      } catch (error) {
        alert("Ops! " + (error as Error).message);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    getUserData();
  }, []);

  useEffect(() => {
    if (id) {
      getRecipe();
    }
  }, [id]);

  const getRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:3001/recipes/${id}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar receita: ${response.statusText}`);
      }
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      alert("Ops! " + (error as Error).message);
    }
  };

  useEffect(() => {
    if (recipe?.userId) {
      getRecipeUser(recipe.userId);
    }
  }, [recipe]);

  const getRecipeUser = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
      }
      const data = await response.json();
      setRecipeUser(data);
    } catch (error) {
      alert("Ops! " + (error as Error).message);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="flex mt-10 mb-14 justify-center">
          {recipe && recipeUser && user ? (
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
