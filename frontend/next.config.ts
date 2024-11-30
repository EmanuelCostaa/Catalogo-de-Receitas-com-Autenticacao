import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/meu-perfil",
        destination: "/MyAccount/MyAccount",
      },
      {
        source: "/menu",
        destination: "/",
      },
      {
        source: "/receita/:id",
        destination: "/RecipeInfo/RecipeInfo?id=:id",
      },
      {
        source: "/editar-receita/:id",
        destination: "/CreateRecipe/CreateRecipe?id=:id",
      },
      {
        source: "/criar-receita",
        destination: "/CreateRecipe/CreateRecipe",
      },
      {
        source: "/login",
        destination: "/Login/Login",
      },
      {
        source: "/sobre-o-projeto",
        destination: "/About/About",
      },
    ];
  },
};

export default nextConfig;
