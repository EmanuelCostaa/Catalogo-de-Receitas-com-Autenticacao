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
import userInterface from "@/interfaces/userInterface";
import recipeInterface from "@/interfaces/recipeInterface";

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
    <div className="flex flex-col w-full">
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
  const [recipeToEdit, setRecipeToEdit] = useState<recipeInterface>(
    {} as recipeInterface
  );
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [modoPreparo, setModoPreparo] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [dificuldade, setDificuldade] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userInterface>({} as userInterface);

  const router = useRouter();
  const { id } = router.query;

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
          throw new Error("Erro ao buscar usuário;");
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
    if (id !== undefined) getRecipeData();
  }, [id]);

  useEffect(() => {
    disableButton();
  }, [name, ingredientes, modoPreparo, tempoPreparo, dificuldade]);

  async function getRecipeData() {
    try {
      const response = await fetch(`http://localhost:3001/recipes/${id}`);
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
      if (!response.ok) {
        throw new Error("Erro ao criar receita");
      }
    } catch (error) {
      alert("Ops! " + (error as Error).message);
    }
  }

  function disableButton() {
    return editMode && recipeToEdit
      ? recipeToEdit.name == name &&
          recipeToEdit.ingredientes == ingredientes &&
          recipeToEdit.modoPreparo == modoPreparo &&
          recipeToEdit.tempoPreparo == +tempoPreparo &&
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
    const userId = user?.id;

    if (editMode) {
      try {
        const editRecipe = {
          name,
          ingredientes,
          modoPreparo,
          tempoPreparo: +tempoPreparo,
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
        alert("Ops! " + (error as Error).message);
      }
      setLoading(false);
      getRecipeData();
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

        alert("Receita criada com sucesso!");
      } catch (error) {
        alert("Ops! " + (error as Error).message);
      }
      setLoading(false);
      router.push(`/menu`);
    }
  }

  return (
    <div>
      <Header />
      <div className="flex w-full h-full justify-center overflow-x-hidden px-4 flex-col ">
        {editMode ? (
          <div className="text-4xl font-bold pt-10 self-center">
            EDITAR RECEITA
          </div>
        ) : (
          <div className="text-4xl font-bold pt-10 self-center">
            CRIAR RECEITA
          </div>
        )}
        <div className="flex sm:m-20 p-10  sm:w-5/6 flex-wrap h-5/6 rounded-3xl bg-yellow-100 overflow-hidden shadow-2xl self-center gap-10 justify-center mt-6 max-w-screen-sm:mt-16 mb-10 max-w-screen-sm:w-screen">
          <div className="flex flex-col w-5/12 min-w-[300px] h-auto max-w-screen-sm:justify-center align-middle  justify-center  gap-6">
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
              label="Modo de preparo"
              placeHolder="Escreva aqui..."
            />
            <Input
              value={tempoPreparo}
              onInputSubmit={(input) => setTempoPreparo(input)}
              label="Tempo de preparo (em minutos)"
              placeHolder="Escreva aqui..."
            />
            <SelectInput
              onSelect={(select) => setDificuldade(select)}
              value={dificuldade}
              label="Dificuldade"
              options={[
                { label: "Fácil", value: 1 },
                { label: "Médio", value: 2 },
                { label: "Difícil", value: 3 },
              ]}
            />
            <Button
              text={editMode ? "Editar Receita" : "Criar Receita"}
              color={editMode ? "yellow" : "green"}
              onClick={handleSubmit}
              disabled={disableButton()}
              loading={loading}
            />
          </div>
          <div className="flex flex-col sm:w-5/12 min-w-[150px] max-w-screen-sm:w-11/12 justify-start max-w-screen-sm:overflow-y-auto items-center mt-6 max-w-screen-sm:mt-16 pr-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Ingredientes:
            </h3>
            <div className="flex flex-wrap gap-2 w-full max-h-80 max-w-screen-sm:max-h-96 overflow-y-auto overflow-x-hidden items-center">
              {ingredientes.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md cursor-pointer max-w-screen-sm:w-1/4 w-full "
                  onClick={() => removeIngredient(index)}
                >
                  <span className="truncate">{ingredient}</span>
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
