import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};
export default function About() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    getUserData();
  }, []);

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
  return (
    <div>
      <Header />
      <h1 className="flex align-middle justify-center p-5 text-2xl font-bold mt-6">
        {user ? (
          <p>
            OLÁ, {user.name.toUpperCase()}! CONHEÇA UM POUCO DO MEU PROJETO!
          </p>
        ) : (
          <p>OLÁ! CONHEÇA UM POUCO DO MEU PROJETO!</p>
        )}
      </h1>
      <div className="p-20 text-2xl">
        <p>
          Este projeto faz parte de uma fase do processo seletivo da empresa
          SOFEX, e a experiência foi extremamente enriquecedora. Ao longo do
          desenvolvimento, tive a oportunidade de expandir meus conhecimentos,
          principalmente no backend, área com a qual tive menos contato até
          então, pois minha experiência anterior era focada no front-end.
        </p>{" "}
        <p>
          O desafio foi uma excelente oportunidade de crescimento profissional e
          aprendizado prático, permitindo que eu aplicasse novas tecnologias e
          abordagens no desenvolvimento de soluções completas.
        </p>{" "}
        <p>
          A jornada foi intensa, mas gratificante, e sou muito grato pela
          oportunidade de fazer parte desse processo. Agradeço à SOFEX pela
          chance de participar dessa fase e por proporcionar um ambiente de
          aprendizado tão valioso. Com certeza, este projeto representou um
          marco importante no meu desenvolvimento como desenvolvedor.
        </p>
      </div>
      <Footer />
    </div>
  );
}
