"use client";
import { useState, useRef, useEffect } from "react";
import { Allotment } from "allotment";
import Outline from "./main/Outline";
import Flow from "./main/Flow";
import Canvas from "./main/Canvas";
import RightBar from "./right/RightBar";
import ToolBar from "./tools/ToolBar";
import FormatConverter from "./tools/FormatConverter";
import { useAppSelector } from "@/redux/hooks";
import { DisplayFormatNumber } from "../types/displayFormatSliceTypes";
import { ClearCanvas } from "../types/canvasTypes";
import Images from "./tools/Images";
import "allotment/dist/style.css";
import { auth } from "../utils/firebase";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState("#42f0ed");
  const formatValue = useAppSelector((state) => state.dataFormat.value);
  const user = auth.currentUser;

  const clearCanvas: ClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  if (user) {
    console.log(`User is: ${user}`);
  } else {
    console.log("No user now");
  }

  return (
    <div className="h-screen w-screen">
      <Allotment className="h-full w-full">
        <Allotment.Pane snap className="relative h-full">
          <FormatConverter />
          {/* <GptResponse /> */}
          <Images />
          {formatValue === DisplayFormatNumber.MIND_MAP ? (
            <Flow />
          ) : (
            <Outline />
          )}
          <Canvas canvasRef={canvasRef} ctx={ctx} color={color} />
          <ToolBar clearCanvas={clearCanvas} setColor={setColor} />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={200} minSize={150}>
          <RightBar />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
