import Image from "next/image";
import { useRouter } from "next/router";

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
      {getText(dificuldade)}
    </span>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CardRecipe({ recipe }: any) {
  const router = useRouter();

  const openRecipe = () => {
    router.push(`/RecipeInfo/RecipeInfo?recipeId=${recipe.id}`);
  };
  return (
    <div
      className="flex-col w-1/3 h-64 rounded-3xl bg-yellow-200 overflow-hidden shadow-lg hover:cursor-pointer"
      onClick={openRecipe}
    >
      <div className="h-1/2 ">
        <Image
          src="/pratoDefault.png"
          alt="RecipeImage"
          width={200}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="h-1/2 p-4 flex flex-col justify-between">
        <div className="flex gap-3">
          <h2 className="text-lg font-bold truncate">{recipe.name}</h2>
          <TagDificuldade dificuldade={recipe.dificuldade as number} />
        </div>

        <p className="text-sm truncate">
          <span className=" font-bold">Ingredientes: </span>
          {recipe.ingredientes.join(", ")}
        </p>
        <p className="text-sm truncate">
          <span className=" font-bold">Modo: </span> {recipe.modoPreparo}
        </p>
        <div className="flex gap-1">
          <Image src="/clock.png" alt="ClockIcon" width={20} height={20} />
          <p className="text-sm"> {recipe.tempoPreparo} min</p>
        </div>
      </div>
    </div>
  );
}
