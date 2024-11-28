import { useEffect, useState } from "react";

interface InputProps {
  onInputSubmit: (InputValue: string) => void;
  placeHolder: string;
  label: string;
}

export default function Input({
  onInputSubmit,
  placeHolder,
  label,
}: InputProps) {
  const [input, setInput] = useState("");

  useEffect(() => {
    handleInputSubmit();
  }, [input]);

  const handleInputSubmit = () => {
    onInputSubmit(input);
  };

  return (
    <div className="flex items-center w-2/5 ">
      <div className="flex flex-col w-full">
        <div className="pl-2">{label}:</div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeHolder}
          className="w-full py-2 pl-2 pr-2 border border-gray-300 rounded-3xl text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
        />
      </div>
    </div>
  );
}
