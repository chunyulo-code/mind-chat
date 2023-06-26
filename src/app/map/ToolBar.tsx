const colors = [
  "bg-red-300",
  "bg-orange-400",
  "bg-yellow-200",
  "bg-green-300",
  "bg-blue-300",
  "bg-purple-300"
];
export default function ToolBar() {
  return (
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-mindchat-secondary px-3 py-2">
      <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-mindchat-primary text-white">
        P
      </div>
      <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-mindchat-primary text-white">
        F
      </div>
      <div className="text-mindchat-secondary">|</div>
      {colors.map((color) => (
        <div
          key={color}
          className={`h-7 w-7 cursor-pointer rounded-full ${color}`}
        ></div>
      ))}
    </div>
  );
}
