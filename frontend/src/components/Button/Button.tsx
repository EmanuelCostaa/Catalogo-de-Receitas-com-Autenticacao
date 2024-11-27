/* eslint-disable @typescript-eslint/no-explicit-any */

interface ButtonProps {
  text: string;
  color: string;
  onClick: () => void; // Definindo a tipagem da função onClick
}
export default function Button({ text, color, onClick }: ButtonProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onClick}
        className={`px-6 py-3 bg-${color}-500 text-white font-semibold rounded-lg shadow-md hover:bg-${color}-800 `}
      >
        {text}
      </button>
    </div>
  );
}
