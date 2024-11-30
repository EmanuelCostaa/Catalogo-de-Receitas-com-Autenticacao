/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Button from "../../components/Button/Button";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    disableButton();
  }, [email, password]);
  useEffect(() => {
    localStorage.clear();
  }, []);

  async function getUserToken(): Promise<string | null> {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login falhou. Verifique suas credenciais.");
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      alert("Ops! " + (error as Error).message);
      return null;
    }
  }

  async function login() {
    setLoadingLogin(true);
    const token = await getUserToken();
    if (token) {
      const userDecoded = parseJwt(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userDecoded));

      router.push("/menu");
    } else {
      alert("Falha ao fazer login. Tente novamente.");
    }
    setLoadingLogin(false);
  }

  function parseJwt(token: string): JSON | null {
    try {
      const base64Url = token.split(".")[1]; // Parte do payload
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Ajusta caracteres
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload); // Converte para objeto JSON
    } catch (error) {
      alert("Ops! " + (error as Error).message);
      return null;
    }
  }
  function disableButton() {
    return email === "" || password === "";
  }

  return (
    <div className="flex w-screen h-screen justify-center">
      <div className="flex w-1/2 h-5/6 rounded-3xl bg-yellow-100 overflow-hidden shadow-2xl self-center justify-center">
        {loadingLogin ? (
          <div className="text-2xl self-center">Carregando...</div>
        ) : (
          <div className="flex flex-col  w-4/6 h-3/4 align-middle mt-16 items-center justify-center gap-6">
            <Image
              src="/LogoFundoBranco.png"
              width={200}
              height={200}
              alt="logo"
            />
            <Input
              value={email}
              onInputSubmit={(input) => setEmail(input)}
              placeHolder="Insira seu email"
              label="Email"
            />
            <Input
              value={password}
              onInputSubmit={(input) => setPassword(input)}
              placeHolder="Insira sua senha"
              label="Senha"
              password
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
            <Button
              text={"Entrar"}
              color={"green"}
              onClick={login}
              disabled={disableButton()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
