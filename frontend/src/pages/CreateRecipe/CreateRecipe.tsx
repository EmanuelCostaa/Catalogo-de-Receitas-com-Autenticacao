/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Button from "../../components/Button/Button";
import Input from "@/components/Input/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import SelectInput from "@/components/SelectInput/SelectInput";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export function InputAddIngredients({
  onAddIngredient,
}: {
  onAddIngredient: (ingredient: string) => void;
}) {
  const [ingredient, setIngredient] = useState("");

  const addIngredient = () => {
    if (ingredient.trim() === "") return;
    onAddIngredient(ingredient);
    setIngredient("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addIngredient();
    }
  };

  return (
    <div className="flex flex-col  w-full">
      <div className="pl-2">
        Adicionar ingredientes {"(coloque a quantidade ex: 3 cenouras)"}:
      </div>
      <div className="relative w-full">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Adicione um ingrediente"
          className="w-full py-2 pl-2 pr-10 border border-gray-300 rounded-3xl text-gray-700 focus:outline-none focus:ring-2"
        />
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={addIngredient}
        >
          <Image src="/plus.png" width={25} height={10} alt="Search Icon" />
        </span>
      </div>
    </div>
  );
}

export default function CreateRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [modoPreparo, setModoPreparo] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [dificuldade, setDificuldade] = useState(0);

  const router = useRouter();

  const addIngredientToList = (ingredient: string) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  function handleSubmit() {
    const newRecipe = {
      recipeName,
      ingredients,
      modoPreparo,
      tempoPreparo,
      dificuldade,
    };
    console.log("Nova receita:", newRecipe);
  }

  return (
    <div>
      <Header />
      <div className="flex w-full h-screen justify-center overflow-x-hidden">
        <div className="flex w-3/4 h-5/6 rounded-3xl bg-yellow-100 overflow-hidden shadow-2xl self-center gap-10">
          <div className="flex flex-col w-1/2 h-3/4 align-middle mt-16 items-start pl-10 justify-center gap-6">
            <Input
              onInputSubmit={(input) => setRecipeName(input)}
              label="Nome da receita"
              placeHolder="Escreva aqui..."
            />
            <InputAddIngredients onAddIngredient={addIngredientToList} />
            <Input
              onInputSubmit={(input) => setModoPreparo(input)}
              label="Modo de preparo"
              placeHolder="Escreva aqui..."
            />
            <Input
              onInputSubmit={(input) => setTempoPreparo(input)}
              label="Tempo de preparo (em minutos)"
              placeHolder="Escreva aqui..."
            />
            <SelectInput
              onDifficultyChange={(select) => setDificuldade(select)}
              labelUp={true}
            />
            <Button
              text={"Criar Receita"}
              color={"green"}
              onClick={handleSubmit}
            />
          </div>
          <div className="flex flex-col w-1/2 justify-start items-start mt-16 pr-6 ">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Ingredientes:
            </h3>
            <div className="flex flex-col gap-2 w-full overflow-y-auto overflow-x-hidden">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md cursor-pointer"
                  onClick={() => removeIngredient(index)}
                >
                  <span>{ingredient}</span>
                  <span className="text-red-600 font-bold">X</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
