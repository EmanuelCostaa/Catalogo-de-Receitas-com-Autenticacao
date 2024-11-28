import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  function goToMyAccount() {
    router.push(`/MyAccount/MyAccount`);
  }
  function goHome() {
    router.push(`/`);
  }
  return (
    <div className="flex justify-between bg-red-700 h-28 ">
      <div className="logo pl-4 self-center cursor-pointer" onClick={goHome}>
        <Image
          src="/LogoFundoColorido.png"
          width={120}
          height={120}
          alt="logo"
        />
      </div>
      <div className="flex justify-between gap-6 self-end text-xl text-white pb-1">
        <Link href="/">Home</Link>
        <Link href="/About/About">About</Link>
      </div>
      <div
        className="flex pr-4 self-center cursor-pointer"
        onClick={goToMyAccount}
      >
        <div className="group relative flex justify-center items-center">
          <Image src="/userWhite.png" width={60} height={40} alt="perfil" />

          <div className="absolute top-full mt-2 px-3 py-2 text-sm bg-gray-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Meu Perfil
          </div>
        </div>
        <div className="relative flex justify-center items-center"></div>
      </div>
    </div>
  );
}
