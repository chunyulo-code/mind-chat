"use client";
import { useState, useRef, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { Allotment } from "allotment";
import Outline from "./main/Outline";
import Flow from "./main/Flow";
import Canvas from "./main/Canvas";
import LeftBar from "./left/LeftBar";
import RightBar from "./right/RightBar";
import ToolBar from "./tools/ToolBar";
import FormatConverter from "./tools/FormatConverter";
import { useAppSelector } from "@/redux/hooks";
import { DisplayFormatNumber } from "../types/displayFormatSliceTypes";
import { ClearCanvas } from "../types/canvasTypes";
import Images from "./tools/Images";
import "allotment/dist/style.css";
import { auth } from "../utils/firebase";
import HeaderBar from "../components/HeaderBar";

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
    console.log(`From auth.currentUser: User is: ${user.uid}`);
  } else {
    console.log("No user now");
  }

  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 z-50 h-[70px] w-full ">
        <HeaderBar />
      </div>
      <Allotment className="h-full w-full pt-[70px]">
        <Allotment.Pane preferredSize={180} minSize={0}>
          <LeftBar />
        </Allotment.Pane>
        <Allotment.Pane snap className="relative h-full">
          <ReactFlowProvider>
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
          </ReactFlowProvider>
        </Allotment.Pane>
        <Allotment.Pane preferredSize={200} minSize={150}>
          <RightBar />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
