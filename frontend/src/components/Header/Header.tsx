import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  function goToMyAccount() {
    router.push(`/meu-perfil`);
  }
  function goHome() {
    router.push(`/menu`);
  }
  return (
    <div>
      <div className="flex justify-between bg-red-700 h-28 ">
        <div
          className="logo pl-4 pt-4 self-center cursor-pointer"
          onClick={goHome}
        >
          <Image
            src="/LogoFundoColorido.png"
            width={120}
            height={120}
            alt="logo"
          />
        </div>

        <div
          className="flex pr-4 self-center cursor-pointer"
          onClick={goToMyAccount}
        >
          <div className="group relative flex justify-center items-center">
            <Image src="/userWhite.png" width={60} height={40} alt="perfil" />

            <div className="absolute top-full mt-2 w-20 py-2 text-sm bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
              Meu Perfil
            </div>
          </div>
          <div className="relative flex justify-center items-center"></div>
        </div>
      </div>
      <div className="flex justify-center bg-red-700  ">
        <div className="flex gap-6 justify-center self-end text-xl flex-wrap text-white pb-1 ">
          <Link href="/" className=" hover:text-yellow-300">
            Menu
          </Link>
          <Link href="/sobre-o-projeto" className=" hover:text-yellow-300">
            Sobre o projeto
          </Link>
        </div>
      </div>
    </div>
  );
}
