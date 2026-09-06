interface ButtonProps {
  message: string;
}

export default function Button({ message }: ButtonProps) {
  return (
    <div className="flex-1 rounded-lg border-4 border-black bg-[#FFD800] px-8 py-4 text-center font-bold text-xl">
      {message}
    </div>
  );
}
