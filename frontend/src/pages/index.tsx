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

export default function Home() {
  const [recipes, setRecipes] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState(0);

  const addRecipe = () => {
    console.log("clicou");
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch("http://localhost:3001/recipes");
    const data = await response.json();
    setRecipes(data);
  };

  return (
    <div>
      <Header />
      <h1 className="flex align-middle justify-center p-5 text-4xl font-bold mt-6">
        AQUI VOCÊ ENCONTRA AS MELHORES RECEITAS!
      </h1>
      <div className="flex gap-10 mt-4 ml-3">
        <SearchInput onSearchSubmit={(search) => setSearchValue(search)} />
        <SelectInput onDifficultyChange={(select) => setSelectValue(select)} />
        <Button
          text={"Adicionar Receita +"}
          color={"green"}
          onClick={addRecipe}
        />
      </div>
      <div className="mt-5 ml-5">
        {recipes.map((recipe: any) => {
          return <CardRecipe recipe={recipe} />;
        })}
      </div>
      <Footer />
    </div>
  );
}
