"use client";
import { useState, useRef } from "react";
import SplitPane, { Pane } from "react-split-pane-next";
import ChatGPT from "./left/ChatGPT";
import Outline from "./left/Outline";
import Flow from "./left/Flow";
import Canvas from "./left/Canvas";
import RightBar from "./right/RightBar";
import ToolBar from "./tools/ToolBar";
import FormatConverter from "./tools/FormatConverter";
import { useAppSelector } from "@/redux/hooks";
import { DisplayFormatNumber } from "../types/displayFormatSliceTypes";
import { ClearCanvas } from "../types/canvasTypes";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState("#42f0ed");
  const formatValue = useAppSelector((state) => state.dataFotmatReducer.value);

  const clearCanvas: ClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // context.fillStyle = "#1F2833";
        // context.fillRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="h-screen w-screen">
      <SplitPane split="vertical">
        <Pane className="relative">
          <FormatConverter />
          <ChatGPT />
          {formatValue === DisplayFormatNumber.MIND_MAP ? (
            <Flow />
          ) : (
            <Outline />
          )}
          <Canvas canvasRef={canvasRef} ctx={ctx} color={color} />
          <ToolBar clearCanvas={clearCanvas} setColor={setColor} />
        </Pane>
        <Pane initialSize="200px" minSize="50px">
          <RightBar />
        </Pane>
      </SplitPane>
    </div>
  );
}
