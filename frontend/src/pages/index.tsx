/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from "next/image";

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import CardRecipe from "@/components/CardRecipe/CardRecipe";
import SearchInput from "@/components/SearchInput/SearchInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import Button from "@/components/Button/Button";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";

type User = {
  name: string;
  email: string;
};
export default function Home() {
  const [recipes, setRecipes] = useState<any>([]);
  const [searchValue, setSearch] = useState("");
  const [selectValue, setSelect] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const addRecipe = () => {
    router.push("/CreateRecipe/CreateRecipe");
  };

  useEffect(() => {
    getRecipes();
    getUserData();
  }, []);

  useEffect(() => {
    getRecipes();
  }, [searchValue, selectValue]);

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
  const getRecipes = async () => {
    const queryFilter = `${searchValue ? "&searchString=" + searchValue : ""}${
      selectValue > 0 ? "&dificuldade=" + selectValue : ""
    }`;
    const response = await fetch(
      `http://localhost:3001/recipes?isDeleted=false${queryFilter}`
    );
    const data = await response.json();
    setRecipes(data);
  };

  return (
    <div>
      <Header />
      <h1 className="flex align-middle justify-center p-5 text-2xl font-bold mt-6">
        {user ? (
          <p>
            OLÁ, {user.name.toUpperCase()}! AQUI VOCÊ ENCONTRA AS MELHORES
            RECEITAS!
          </p>
        ) : (
          <p>AQUI VOCÊ ENCONTRA AS MELHORES RECEITAS!</p>
        )}
      </h1>
      <div className="flex gap-10 mt-4 ml-3">
        <SearchInput onSearchSubmit={(search) => setSearch(search)} />
        <SelectInput
          onDifficultyChange={(select) => setSelect(select)}
          value={selectValue}
        />
        <Button
          text={"Adicionar Receita +"}
          color={"green"}
          onClick={addRecipe}
        />
      </div>
      <div className="m-5 flex justify-around gap-10 flex-wrap overflow-y-auto">
        {recipes.length > 0 ? (
          <>
            {recipes.map((recipe: any) => {
              return <CardRecipe recipe={recipe} />;
            })}
          </>
        ) : (
          <div className="flex h-96 items-center">
            Nenhuma receita encontrada.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
