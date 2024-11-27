import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col align-middle justify-center bg-red-700 h-42 mb-0">
      <div className="text-white text-center font-medium pt-4">
        © 2024 - GoReceitas. Todos os direitos reservados.
      </div>
      <div className="self-center">
        <Image
          src="/LogoFundoColorido.png"
          width={120}
          height={120}
          alt="logo"
        />
      </div>
    </div>
  );
}
