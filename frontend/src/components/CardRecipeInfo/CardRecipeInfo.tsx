/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Button from "../Button/Button";

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

function editRecipe() {}
export default function CardRecipeInfo({
  recipe,
  user,
}: {
  recipe: any;
  user: any;
}) {
  return (
    <div className="flex w-9/12 h-3/6 rounded-3xl bg-yellow-200 overflow-hidden shadow-lg hover:cursor-pointer">
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
        <div className="flex gap-3">
          <h2 className="text-lg font-bold truncate">{recipe.name}</h2>
          <TagDificuldade dificuldade={recipe.dificuldade as number} />
        </div>
        <p className="text-sm">
          <span className="font-bold">Postada por: </span>
          {user.name}
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
            <p className="text-lg self-center"> {recipe.tempoPreparo}m</p>
          </div>
          <Button
            color={"yellow"}
            text={"Editar receita"}
            onClick={editRecipe}
          />
        </div>
      </div>
    </div>
  );
}
