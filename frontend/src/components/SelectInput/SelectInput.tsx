import React from "react";

interface SelectInputProps {
  value: number;
  onSelect: (difficulty: number) => void;
  label?: string;
  labelUp?: boolean;
  options: option[];
}

interface option {
  label: string;
  value: number;
}

export default function SelectInput({
  value,
  onSelect,
  label,
  labelUp = false,
  options,
}: SelectInputProps) {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const select = parseInt(event.target.value, 10);
    onSelect(select);
  };

  return (
    <div className="flex w-ful items-center justify-center min-w-[250px]  ">
      <div
        className={`${labelUp ? "flex-col " : "flex items-center space-x-4"}`}
      >
        {label && (
          <label htmlFor="label" className={`${labelUp && "pl-2 "}`}>
            {label}:
          </label>
        )}

        <div className="relative w-full">
          <select
            id="select"
            value={value}
            onChange={handleSelect}
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 appearance-none"
          >
            <option value={0}>Selecione...</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500">
            V
          </span>
        </div>
      </div>
    </div>
  );
}
