import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between bg-red-700 h-28 ">
      <div className="logo pl-4 self-center">
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
      <div className="flex pr-4 self-center ">
        <Image src="/userWhite.png" width={60} height={40} alt="perfil" />
      </div>
    </div>
  );
}
