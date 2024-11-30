/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Button from "../../components/Button/Button";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function disableButton() {
    return (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      name === "" ||
      password != confirmPassword
    );
  }

  useEffect(() => {
    disableButton();
  }, [email, password, confirmPassword, name]);

  async function createUser() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao registrar o usuário");
      }

      const data = await response.json();
      alert("Usuário criado com sucesso!");
      router.push("/Login/Login");
    } catch (error) {
      alert("Ops! Erro ao registrar o usuário.");
      throw error;
    }
    setLoading(false);
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
        <div className="w-4/6  self-center justify-center">
          <div className="flex flex-col  w-full h-3/4 align-middle  gap-6">
            <Input
              value={email}
              onInputSubmit={(input) => setEmail(input)}
              placeHolder="Insira seu email"
              label="Email"
            />
            <Input
              value={name}
              onInputSubmit={(input) => setName(input)}
              placeHolder="Insira seu nome"
              label="Nome"
            />
            <Input
              value={password}
              onInputSubmit={(input) => setPassword(input)}
              placeHolder="Insira uma senha"
              label="Senha"
              password
            />
            <Input
              value={confirmPassword}
              onInputSubmit={(input) => setConfirmPassword(input)}
              placeHolder="Confirme a senha"
              label="Confirmar senha"
              password
            />

            {password != confirmPassword &&
              "As senhas não coincidem. Tente novamente."}
            <Button
              text={"Criar Conta"}
              color={"green"}
              onClick={createUser}
              disabled={disableButton()}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
