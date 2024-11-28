/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Button from "../../components/Button/Button";
import Input from "@/components/Input/Input";
import { useState } from "react";
import Link from "next/link";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  function login() {
    console.log("Email: ", email);
    console.log("Senha: ", password);
    console.log("Senha2: ", ConfirmPassword);
    window.location.replace("");
  }

  return (
    <div className="flex w-screen h-screen justify-center">
      <div className="flex flex-col w-1/2 h-5/6 rounded-3xl bg-yellow-100 overflow-hidden shadow-2xl self-center justify-center">
        <Link
          href="/Login/Login"
          className="ml-5 text-blue-600 hover:text-blue-800 text-lg"
        >
          {"< "} Voltar
        </Link>
        <div className="flex flex-col  w-full h-3/4 align-middle  items-center justify-center gap-6">
          <Input
            onInputSubmit={(input) => setEmail(input)}
            placeHolder="Insira seu email"
            label="Email"
          />
          <Input
            onInputSubmit={(input) => setPassword(input)}
            placeHolder="Insira uma senha"
            label="Senha"
          />
          <Input
            onInputSubmit={(input) => setConfirmPassword(input)}
            placeHolder="Confirme a senha"
            label="Confirmar senha"
          />

          <Button text={"Criar Conta"} color={"green"} onClick={login} />
        </div>
      </div>
    </div>
  );
}
