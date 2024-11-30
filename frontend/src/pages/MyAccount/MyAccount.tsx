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

export default function MyAccount({}) {
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [userRecipes, setUserRecipes] = useState<any>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [nameToChange, setNameToChange] = useState("");
  const [emailToChange, setEmailToChange] = useState("");

  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    if (user?.id) getUserRecipes();
  }, [user]);

  function logout() {
    localStorage.clear();
    router.push("/Login/Login");
  }
  async function getUserData() {
    setLoadingUser(true);
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);

      const userId = userData.sub;
      const response = await fetch(`http://localhost:3001/user/${userId}`);
      const data = await response.json();
      setUser(data);
      setNameToChange(data.name);
      setEmailToChange(data.email);
    }
    setLoadingUser(false);
  }

  async function getUserRecipes() {
    setLoadingRecipes(true);

    const response = await fetch(
      `http://localhost:3001/recipes?userId=${user.id}&isDeleted=false`
    );
    const data = await response.json();
    setUserRecipes(data);
    setLoadingRecipes(false);
  }
  async function editUser() {
    const userId = user.id;
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
      alert("Ops! Erro ao atualizar o perfil.");
    }
    setEditMode(false);
    getUserData();
  }

  return (
    <div>
      <Header />

      <div className="flex flex-col ">
        <div className="flex w-2/6 flex-col self-center items-center p-5 h-3/6 m-10 rounded-3xl bg-slate-400 overflow-hidden shadow-lg">
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
                  <div className="flex gap-6">
                    <Button
                      color={"red"}
                      text={"Cancelar"}
                      onClick={() => setEditMode(false)}
                    />
                    <Button
                      color={"green"}
                      text={"Confirmar"}
                      onClick={editUser}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-10">
                  <div className="flex items-center">
                    <span className="font-bold text-lg">Nome: </span>&nbsp;
                    {user?.name.toUpperCase()}
                  </div>

                  <p className="text-sm">
                    <span className="font-bold">Email: </span>
                    {user?.email}
                  </p>
                  <div className="flex gap-6">
                    <Button color={"red"} text={"Sair"} onClick={logout} />
                    <Button
                      color={"yellow"}
                      text={"Editar perfil"}
                      onClick={() => setEditMode(true)}
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
        {loadingRecipes ? (
          "Carregando..."
        ) : (
          <div className="m-5 flex justify-around gap-10  flex-wrap overflow-y-auto">
            {userRecipes.map((recipe: any) => {
              return <CardRecipe recipe={recipe} />;
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
