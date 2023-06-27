import { ClearCanvas } from "../../types/canvasTypes";
import { useAppDispatch } from "@/redux/hooks";
import { toMindMapMode, toDrawingMode } from "@/redux/features/userModeSlice";

type ToolBarProps = {
  clearCanvas: ClearCanvas;
  setColor: (color: string) => void;
};

type Tool = {
  clickHandler: () => void;
  text: string;
};

export default function ToolBar({ clearCanvas, setColor }: ToolBarProps) {
  const dispatch = useAppDispatch();
  const toMindMapModeHandler = () => dispatch(toMindMapMode());
  const toDrawingModeHandler = () => dispatch(toDrawingMode());
  const clearCanvasHandler = () => clearCanvas();
  const importFilesHandler = () => console.log("You can import files now");

  const tools: Tool[] = [
    { clickHandler: toMindMapModeHandler, text: "P" },
    { clickHandler: toDrawingModeHandler, text: "D" },
    { clickHandler: clearCanvasHandler, text: "C" },
    { clickHandler: importFilesHandler, text: "F" }
  ];

  const primaryClickHandler = () => {
    setColor("#42f0ed");
  };
  const redClickHandler = () => {
    setColor("rgb(252, 165, 165)");
  };
  const orangeClickHandler = () => {
    setColor("rgb(255, 171, 68)");
  };
  const yellowClickHandler = () => {
    setColor("rgb(250, 238, 129)");
  };
  const greenClickHandler = () => {
    setColor("rgb(161, 255, 158)");
  };
  const blueClickHandler = () => {
    setColor("rgb(151, 194, 255)");
  };
  const purpleClickHandler = () => {
    setColor("rgb(197, 156, 255)");
  };

  const colors = [
    { clickHandler: primaryClickHandler, colorName: "bg-mindchat-primary" },
    { clickHandler: redClickHandler, colorName: "bg-red-300" },
    { clickHandler: orangeClickHandler, colorName: "bg-orange-400" },
    { clickHandler: yellowClickHandler, colorName: "bg-yellow-200" },
    { clickHandler: greenClickHandler, colorName: "bg-green-300" },
    { clickHandler: blueClickHandler, colorName: "bg-blue-300" },
    { clickHandler: purpleClickHandler, colorName: "bg-purple-300" }
  ];

  return (
    <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-mindchat-secondary px-3 py-2">
      {tools.map((tool) => (
        <div
          key={tool.text}
          onClick={tool.clickHandler}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-mindchat-primary text-white"
        >
          {tool.text}
        </div>
      ))}
      <div className="text-mindchat-secondary">|</div>
      {colors.map((color) => (
        <div
          key={color.colorName}
          onClick={color.clickHandler}
          className={`h-7 w-7 cursor-pointer rounded-full ${color.colorName}`}
        ></div>
      ))}
    </div>
  );
}
