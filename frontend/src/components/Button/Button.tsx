/* eslint-disable @typescript-eslint/no-explicit-any */

interface ButtonProps {
  text: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}
export default function Button({
  text,
  color,
  onClick,
  disabled,
  loading,
}: ButtonProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 bg-${color}-500 text-white font-semibold rounded-lg shadow-md hover:bg-${color}-800 ${
          disabled && "inset-0 bg-black bg-opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Carregando..." : text}
      </button>
    </div>
  );
}
