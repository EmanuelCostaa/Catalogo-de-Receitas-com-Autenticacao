import { useState } from "react";

interface SelectInputProps {
  onDifficultyChange: (difficulty: number) => void;
  labelUp: boolean;
}

export default function SelectInput({
  onDifficultyChange,
  labelUp = false,
}: SelectInputProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const difficulty = parseInt(event.target.value, 10);
    setSelectedDifficulty(difficulty);
    onDifficultyChange(difficulty);
  };

  return (
    <div className="flex items-center justify-center space-y-4">
      <div
        className={`${labelUp ? "flex-col " : "flex items-center space-x-4"}`}
      >
        <label htmlFor="difficulty" className={`${labelUp && "pl-2 "}`}>
          Dificuldade:
        </label>

        <div className="relative w-64">
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 appearance-none"
          >
            <option value={0}>Selecione...</option>
            <option value={1}>Fácil</option>
            <option value={2}>Média</option>
            <option value={3}>Difícil</option>
          </select>

          <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500">
            V
          </span>
        </div>
      </div>
    </div>
  );
}
