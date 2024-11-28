/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Button from "../../components/Button/Button";

function editRecipe() {}
export default function MyAccount({}) {
  return (
    <div className="flex flex-col">
      <div className="flex w-auto flex-col items-start gap-10 p-5 h-3/6 m-10 rounded-3xl bg-slate-400 overflow-hidden shadow-lg">
        <Image src="/userWhite.png" alt="user" width={120} height={40} />

        <div className="flex items-center">
          <span className="font-bold text-lg">Nome: {"  "}</span>
          Nome do cidadão aqui
        </div>
        <p className="text-sm">
          <span className="font-bold">Email: </span>
          Email do cidadão aqui
        </p>

        <Button color={"yellow"} text={"Editar perfil"} onClick={editRecipe} />
      </div>
      <h1 className="flex align-middle  p-5 text-3xl font-bold mt-6">
        SUAS RECEITAS
      </h1>
    </div>
  );
}
