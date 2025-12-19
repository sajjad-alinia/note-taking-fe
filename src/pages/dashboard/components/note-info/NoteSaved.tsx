type TNoteSaved = {
  isTyping: boolean;
};

const NoteSaved = ({ isTyping }: TNoteSaved) => {
  return (
    <div
      className={`centering text-xs text-white select-none w-10 h-fit shadow-sm rounded-md px-1.5 py-1 ${
        isTyping ? "bg-yellow-600 animate-bounce" : "bg-green-500"
      }`}
    >
      Saved
    </div>
  );
};

export default NoteSaved;
