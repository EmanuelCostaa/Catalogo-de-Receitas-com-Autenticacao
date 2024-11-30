import Image from "next/image";
import { useState } from "react";

interface SearchInputProps {
  onSearchSubmit: (searchValue: string) => void;
}

export default function SearchInput({ onSearchSubmit }: SearchInputProps) {
  const [search, setSearch] = useState("");

  const handleSearchSubmit = () => {
    onSearchSubmit(search);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="flex items-center w-2/5 ">
      <div className="relative w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar..."
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-3xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700"
        />
        <span
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={handleSearchSubmit}
        >
          <Image src="/search.png" width={25} height={10} alt="Search Icon" />
        </span>
      </div>
    </div>
  );
}
