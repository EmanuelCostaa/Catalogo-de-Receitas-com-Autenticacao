/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Button from "../../components/Button/Button";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SelectInput from "@/components/SelectInput/SelectInput";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export function InputAddingredientes({
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
  const [recipeToEdit, setRecipeToEdit] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [modoPreparo, setModoPreparo] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [dificuldade, setDificuldade] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  const router = useRouter();
  const { recipeId } = router.query;

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
    if (recipeId !== undefined) getRecipeData();
  }, [recipeId]);

  useEffect(() => {
    disableButton();
  }, [name, ingredientes, modoPreparo, tempoPreparo, dificuldade]);

  async function getRecipeData() {
    const response = await fetch(`http://localhost:3001/recipes/${recipeId}`);
    const data = await response.json();
    if (data) {
      setEditMode(true);
      setRecipeToEdit(data);
      setName(data.name);
      setIngredientes(data.ingredientes);
      setModoPreparo(data.modoPreparo);
      setTempoPreparo(data.tempoPreparo);
      setDificuldade(data.dificuldade);
    }
  }

  function disableButton() {
    return editMode && recipeToEdit
      ? recipeToEdit.name == name &&
          recipeToEdit.ingredientes == ingredientes &&
          recipeToEdit.modoPreparo == modoPreparo &&
          recipeToEdit.tempoPreparo == tempoPreparo &&
          recipeToEdit.dificuldade == dificuldade
      : !name || !ingredientes || !modoPreparo || !tempoPreparo || !dificuldade;
  }

  const addIngredientToList = (ingredient: string) => {
    setIngredientes((previngredientes) => [...previngredientes, ingredient]);
  };

  const removeIngredient = (index: number) => {
    setIngredientes((previngredientes) =>
      previngredientes.filter((_, i) => i !== index)
    );
  };

  async function handleSubmit() {
    setLoading(true);
    const userId = user.id;

    if (editMode) {
      try {
        const editRecipe = {
          name,
          ingredientes,
          modoPreparo: +modoPreparo,
          tempoPreparo,
          dificuldade,
          userId,
        };
        const response = await fetch(
          `http://localhost:3001/recipes/${recipeToEdit.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editRecipe),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao atualizar receita");
        }

        alert("Receita atualizada com sucesso!");
      } catch (error) {
        alert("Ops! Erro ao atualizar a receita.");
      }
      setLoading(false);
      router.reload();
    } else {
      const newRecipe = {
        name,
        ingredientes,
        modoPreparo,
        tempoPreparo: parseInt(tempoPreparo, 10),
        dificuldade,
        user: {
          connect: { id: userId },
        },
      };
      try {
        const response = await fetch("http://localhost:3001/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecipe),
        });

        if (!response.ok) {
          throw new Error("Erro ao criar receita");
        }

        const createdRecipe = await response.json();
        alert("Receita criada com sucesso!");
        return createdRecipe;
      } catch (error) {
        alert("Ops! Erro na criação da receita.");
      }
      setLoading(false);
      router.push(`/`);
    }
  }

  return (
    <div>
      <Header />
      <div className="flex w-full h-screen justify-center overflow-x-hidden">
        <div className="flex w-3/4 h-5/6 rounded-3xl bg-yellow-100 overflow-hidden shadow-2xl self-center gap-10">
          <div className="flex flex-col w-1/2 h-3/4 align-middle mt-16 items-start pl-10 justify-center gap-6">
            <Input
              value={name}
              onInputSubmit={(input) => setName(input)}
              label="Nome da receita"
              placeHolder="Escreva aqui..."
            />
            <InputAddingredientes onAddIngredient={addIngredientToList} />
            <Input
              value={modoPreparo}
              onInputSubmit={(input) => setModoPreparo(input)}
              label="Modo de modoPreparo"
              placeHolder="Escreva aqui..."
            />
            <Input
              value={tempoPreparo}
              onInputSubmit={(input) => setTempoPreparo(input)}
              label="Tempo de modoPreparo (em minutos)"
              placeHolder="Escreva aqui..."
            />
            <SelectInput
              value={dificuldade}
              onDifficultyChange={(select) => setDificuldade(select)}
              labelUp={true}
            />
            <Button
              text={editMode ? "Editar Receita" : "Criar Receita"}
              color={editMode ? "yellow" : "green"}
              onClick={handleSubmit}
              disabled={disableButton()}
              loading={loading}
            />
          </div>
          <div className="flex flex-col w-1/2 justify-start items-start mt-16 pr-6 ">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Ingredientes:
            </h3>
            <div className="flex flex-col gap-2 w-full overflow-y-auto overflow-x-hidden">
              {ingredientes.map((ingredient, index) => (
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
