/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import CardRecipe from "@/components/CardRecipe/CardRecipe";
import SearchInput from "@/components/SearchInput/SearchInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import Button from "@/components/Button/Button";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
import PageCounter from "@/components/PageCounter/PageCounter";
import recipeInterface from "@/interfaces/recipeInterface";

type User = {
  name: string;
  email: string;
};
export default function Home() {
  const [recipes, setRecipes] = useState<recipeInterface[]>([]);
  const [searchValue, setSearch] = useState("");
  const [selectValue, setSelect] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [maxPage, setMaxPage] = useState(Number);
  const [user, setUser] = useState<User | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const router = useRouter();

  function addRecipe() {
    router.push("/criar-receita");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    getRecipes();
    getUserData();
  }, []);

  useEffect(() => {
    getRecipes();
  }, [page]);
  useEffect(() => {
    if (page > 1) {
      setPage(1);
    } else {
      getRecipes();
    }
  }, [pageSize]);

  useEffect(() => {
    getRecipes();
  }, [searchValue, selectValue]);

  const getUserData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);

      const userId = userData.sub;
      try {
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
  const getRecipes = async () => {
    setLoadingData(true);
    const queryFilter = `${searchValue ? "&searchString=" + searchValue : ""}${
      selectValue > 0 ? "&dificuldade=" + selectValue : ""
    }${page ? "&page=" + page : ""}${pageSize ? "&limit=" + pageSize : ""}`;

    try {
      const response = await fetch(
        `http://localhost:3001/recipes?isDeleted=false${queryFilter}`
      );
      const data = await response.json();
      setPage(data.currentPage);
      setMaxPage(data.totalPages);
      setRecipes(data.recipes);
      setLoadingData(false);
      if (!response.ok) {
        throw new Error(`Erro ao buscar receitas.`);
      }
    } catch (error) {
      alert("Ops! " + (error as Error).message);
    }
  };

  return (
    <div>
      <Header />
      <h1 className="flex align-middle text-center justify-center p-5 text-2xl font-bold mt-6">
        {user ? (
          <p>
            OLÁ, {user.name.toUpperCase()}! AQUI VOCÊ ENCONTRA AS MELHORES
            RECEITAS!
          </p>
        ) : (
          <p>AQUI VOCÊ ENCONTRA AS MELHORES RECEITAS!</p>
        )}
      </h1>
      <div className="flex gap-10 mt-4 ml-3 flex-wrap justify-center">
        <SearchInput onSearchSubmit={(search) => setSearch(search)} />
        <SelectInput
          onSelect={(select) => setSelect(select)}
          value={selectValue}
          label="Dificuldade"
          options={[
            { label: "Fácil", value: 1 },
            { label: "Médio", value: 2 },
            { label: "Difícil", value: 3 },
          ]}
        />
        <Button
          text={"Adicionar Receita +"}
          color={"green"}
          onClick={addRecipe}
        />
      </div>
      {loadingData ? (
        <div className="flex justify-center items-center p-20 h-96 w-screen">
          Carregando...
        </div>
      ) : (
        <div className="m-5 flex justify-center flex-wrap  gap-10  overflow-y-auto">
          {recipes.length > 0 ? (
            <>
              {recipes.map((recipe: recipeInterface) => {
                return <CardRecipe recipe={recipe} key={recipe.id} />;
              })}
            </>
          ) : (
            <div className="flex h-96 items-center">
              Nenhuma receita encontrada.
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center">
        <PageCounter
          page={page}
          maxPage={maxPage}
          pageSize={pageSize}
          changePage={setPage}
          changePageSize={setPageSize}
        />
      </div>
      <Footer />
    </div>
  );
}
