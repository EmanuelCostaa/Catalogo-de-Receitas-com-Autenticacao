/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Button from "../../components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardRecipe from "@/components/CardRecipe/CardRecipe";
import Input from "@/components/Input/Input";
import PageCounter from "@/components/PageCounter/PageCounter";
import SearchInput from "@/components/SearchInput/SearchInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import userInterface from "@/interfaces/userInterface";
import recipeInterface from "@/interfaces/recipeInterface";

export default function MyAccount({}) {
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<userInterface | null>(null);
  const [userRecipes, setUserRecipes] = useState<recipeInterface[]>(
    [] as recipeInterface[]
  );
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [nameToChange, setNameToChange] = useState("");
  const [emailToChange, setEmailToChange] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [maxPage, setMaxPage] = useState(Number);
  const [searchValue, setSearch] = useState("");
  const [selectValue, setSelect] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    getUserData();
  }, []);

  useEffect(() => {
    if (user?.id) getUserRecipes();
  }, [user]);

  useEffect(() => {
    getUserRecipes();
  }, [page, searchValue, selectValue]);

  useEffect(() => {
    if (page > 1) {
      setPage(1);
    } else {
      getUserRecipes();
    }
  }, [pageSize]);

  useEffect(() => {
    disableConfirmButton();
  }, [emailToChange, nameToChange]);

  function addRecipe() {
    router.push("/criar-receita");
  }

  function logout() {
    localStorage.clear();
    router.push("/login");
  }

  function disableConfirmButton() {
    return (
      (!emailToChange && !nameToChange) ||
      (emailToChange == user?.email && nameToChange == user?.name) ||
      (emailToChange == user?.email && !nameToChange) ||
      (!emailToChange && nameToChange == user?.name)
    );
  }

  function editModeOn() {
    setEditMode(true);
    setNameToChange(user ? user.name : "");
    setEmailToChange(user ? user.email : "");
  }

  async function getUserData() {
    setLoadingUser(true);
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);

      try {
        const userId = userData.sub;
        const response = await fetch(`http://localhost:3001/user/${userId}`);
        const data = await response.json();
        setUser(data);
        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }
      } catch (error) {
        alert("Ops! " + (error as Error).message);
      }
    }
    setPage(1);
    setPageSize(5);
    setLoadingUser(false);
  }

  async function getUserRecipes() {
    setLoadingRecipes(true);

    if (user) {
      const queryFilter = `${"&userId=" + user.id}${
        searchValue ? "&searchString=" + searchValue : ""
      }${selectValue > 0 ? "&dificuldade=" + selectValue : ""}${
        page ? "&page=" + page : ""
      }${pageSize ? "&limit=" + pageSize : ""}`;

      try {
        const response = await fetch(
          `http://localhost:3001/recipes?isDeleted=false${queryFilter}`
        );
        const data = await response.json();
        setPage(data.currentPage);
        setMaxPage(data.totalPages);
        setUserRecipes(data.recipes);
        if (!response.ok) {
          throw new Error("Erro ao buscar receitas do usuário.");
        }
      } catch (error) {
        alert("Ops! " + (error as Error).message);
      }
    }
    setLoadingRecipes(false);
  }
  async function editUser() {
    const userId = user?.id;
    setLoadingUser(true);

    try {
      const editUser = {
        name: nameToChange,
        email: emailToChange,
      };
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar pefil");
      }

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      alert("Ops! " + (error as Error).message);
    }
    setEditMode(false);
    getUserData();
  }

  return (
    <div>
      <Header />

      <div className="flex flex-col ">
        <div className="flex w-2/6 flex-col self-center items-center p-5 h-3/6 m-10 rounded-3xl bg-slate-400 overflow-hidden shadow-lg min-w-[300px]">
          {loadingUser ? (
            "Carregando..."
          ) : (
            <div className="flex flex-col items-center gap-10">
              <Image src="/userWhite.png" alt="user" width={120} height={40} />

              {editMode ? (
                <div className="flex flex-col gap-10">
                  <Input
                    value={nameToChange}
                    onInputSubmit={(input) => setNameToChange(input)}
                    placeHolder="Insira o novo nome"
                    label="Nome"
                  />
                  <Input
                    value={emailToChange}
                    onInputSubmit={(input) => setEmailToChange(input)}
                    placeHolder="Insira o novo email"
                    label="Email"
                  />
                  <div className="flex justify-center flex-wrap gap-6">
                    <Button
                      color={"red"}
                      text={"Cancelar"}
                      onClick={() => setEditMode(false)}
                    />
                    <Button
                      color={"green"}
                      text={"Confirmar"}
                      onClick={editUser}
                      disabled={disableConfirmButton()}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-10">
                  <div className="flex flex-wrap justify-center items-center">
                    <span className="font-bold text-lg">Nome: </span>&nbsp;
                    {user?.name.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap justify-center items-center">
                    <span className="font-bold">Email: </span>&nbsp;
                    {user?.email}
                  </div>

                  <div className="flex justify-center flex-wrap gap-6">
                    <Button color={"red"} text={"Sair"} onClick={logout} />
                    <Button
                      color={"yellow"}
                      text={"Editar perfil"}
                      onClick={editModeOn}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <h1 className="flex  self-center  p-5 text-3xl font-bold mt-6">
          MINHAS RECEITAS
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
        </div>
        {loadingRecipes
          ? "Carregando..."
          : userRecipes && (
              <div className="m-5 flex justify-center gap-10 flex-wrap overflow-y-auto">
                {userRecipes.map((recipe: recipeInterface) => (
                  <CardRecipe key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
      </div>
      {userRecipes.length > 0 ? (
        <div className="flex justify-center">
          <PageCounter
            page={page}
            maxPage={maxPage}
            pageSize={pageSize}
            changePage={setPage}
            changePageSize={setPageSize}
          />
        </div>
      ) : (
        <div className="flex justify-center p-10 gap-10 flex-col items-center">
          <div className="text-xl">
            Você não tem nenhuma receita ainda! :{"("}
          </div>
          <div className="text-xl">
            Mas você pode adicionar uma agora! :{")"}
          </div>
          <div className="">
            {" "}
            <Button
              text={"Adicionar Receita +"}
              color={"green"}
              onClick={addRecipe}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
