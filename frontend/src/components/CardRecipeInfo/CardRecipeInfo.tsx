/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import { useState } from "react";

function TagDificuldade({ dificuldade }: { dificuldade: number }) {
  const difficultyClass = (dificuldade: number) => {
    switch (dificuldade) {
      case 1:
        return "bg-green-500 text-white"; // Fácil
      case 2:
        return "bg-yellow-500 text-white"; // Médio
      case 3:
        return "bg-red-500 text-white"; // Difícil
      default:
        return "bg-gray-500 text-white"; // Padrão
    }
  };

  const getText = (dificuldade: number) => {
    switch (dificuldade) {
      case 1:
        return "Fácil";
      case 2:
        return "Médio";
      case 3:
        return "Difícil";
      default:
        return "Indefinido";
    }
  };

  return (
    <span
      className={` self-center px-4 text-sm h-5 rounded-md ${difficultyClass(
        dificuldade
      )}`}
    >
      {getText(dificuldade)} {/* Exibe o texto correspondente à dificuldade */}
    </span>
  );
}

export default function CardRecipeInfo({
  recipe,
  user,
  recipeUser,
}: {
  recipe: any;
  user: any;
  recipeUser: any;
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loadingDelete, setIsLoadingDelete] = useState(false);
  const router = useRouter();

  function editRecipe() {
    router.push(`/CreateRecipe/CreateRecipe?recipeId=${recipe.id}`);
  }
  async function softDeleteRecipe() {
    setIsLoadingDelete(true);

    try {
      const recipeToSoftDelete = {
        isDeleted: true,
      };
      const response = await fetch(
        `http://localhost:3001/recipes/${recipe.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeToSoftDelete),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao deletar receita");
      }

      alert("Receita deletada com sucesso!");
    } catch (error) {
      alert("Ops! Erro ao deletar a receita.");
    }
    setIsLoadingDelete(false);
    setIsPopupVisible(false);
    router.push(`/`);
  }

  return (
    <div className="flex w-9/12 h-3/6 rounded-3xl bg-yellow-200 overflow-hidden shadow-lg">
      <div className="w-1/2 ">
        <Image
          src="/pratoDefault.png"
          alt="RecipeImage"
          width={200}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-1/2 p-4 flex flex-col gap-11 justify-between">
        <div className="flex gap-3 flex-wrap">
          <h2 className="text-lg font-bold truncate">{recipe.name}</h2>
          <TagDificuldade dificuldade={recipe.dificuldade as number} />
        </div>
        <p className="text-sm">
          <span className="font-bold">Postada por: </span>
          {recipeUser.name}
        </p>

        <p className="text-sm">
          <span className=" font-bold">Ingredientes: </span>
          {recipe.ingredientes.join(", ")}
        </p>
        <p className="text-sm">
          <span className=" font-bold">Modo: </span> {recipe.modoPreparo}
        </p>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <Image src="/clock.png" alt="ClockIcon" width={40} height={40} />
            <p className="text-lg self-center"> {recipe.tempoPreparo} min</p>
          </div>
          {user.id == recipe.userId && (
            <div className="flex gap-6">
              <div className=" hover:cursor-pointer">
                <Image
                  src="/trash.png"
                  alt="ClockIcon"
                  width={50}
                  height={30}
                  onClick={() => setIsPopupVisible(true)}
                />
              </div>
              <Button
                color={"yellow"}
                text={"Editar receita"}
                onClick={editRecipe}
              />
            </div>
          )}
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md h-48 shadow-lg flex flex-col justify-between">
            <p className="text-lg font-bold mb-4">
              Essa ação é irreversível. Deseja mesmo apagar a receita?
            </p>
            {loadingDelete && <div>Deletando...</div>}

            <div className="flex justify-between gap-1">
              <Button
                color={"green"}
                text={"Cancelar"}
                onClick={() => setIsPopupVisible(false)}
              />
              <Button
                color={"red"}
                text={"Confirmar"}
                onClick={softDeleteRecipe}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
