/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Button from "../../components/Button/Button";
import Input from "@/components/Input/Input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function login() {
    console.log("Email: ", email);
    console.log("Senha: ", password);
    // Redirecionar para a página inicial após o login
    // replace("/Home") com a página inicial desejada
    router.push(`/`);
  }

  return (
    <div className="flex w-screen h-screen justify-center">
      <div className="flex w-1/2 h-5/6 rounded-3xl bg-yellow-100 overflow-hidden shadow-2xl self-center justify-center">
        <div className="flex flex-col  w-full h-3/4 align-middle mt-16 items-center justify-center gap-6">
          <Image
            src="/LogoFundoBranco.png"
            width={200}
            height={200}
            alt="logo"
          />
          <Input
            onInputSubmit={(input) => setEmail(input)}
            placeHolder="Insira seu email"
            label="Email"
          />
          <Input
            onInputSubmit={(input) => setPassword(input)}
            placeHolder="Insira sua senha"
            label="Senha"
          />
          <div>
            Não possui conta?{" "}
            <Link
              href="/CreateAccount/CreateAccount"
              className="underline text-blue-600 hover:text-blue-800"
            >
              Crie agora
            </Link>
          </div>
          <Button text={"Entrar"} color={"green"} onClick={login} />
        </div>
      </div>
    </div>
  );
}
