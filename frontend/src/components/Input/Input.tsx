interface InputProps {
  value: string; // Valor vindo do pai
  onInputSubmit: (InputValue: string) => void; // Função de atualização no pai
  placeHolder: string;
  label: string;
  password?: boolean;
}

export default function Input({
  value,
  onInputSubmit,
  placeHolder,
  label,
  password,
}: InputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputSubmit(e.target.value); // Atualiza o valor no pai
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col w-full">
        <div className="pl-2">{label}:</div>
        <input
          type={password ? "password" : "text"}
          value={value} // Controlado pelo pai
          onChange={handleInputChange}
          placeholder={placeHolder}
          className="w-full py-2 pl-2 pr-2 border border-gray-300 rounded-3xl text-gray-700 focus:outline-none focus:ring-1"
        />
      </div>
    </div>
  );
}
