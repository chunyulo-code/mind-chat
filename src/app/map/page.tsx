"use client";
import { useRef } from "react";
import "allotment/dist/style.css";
import { ReactFlowProvider } from "reactflow";
import { Allotment } from "allotment";
import HeaderBar from "../components/HeaderBar";
import FormatConverter from "./tools/FormatConverter";
import Flow from "./main/Flow";
import Outline from "./main/Outline";
import Canvas from "./main/Canvas";
import LeftBar from "./left/LeftBar";
import RightBar from "./right/RightBar";
import ToolBar from "./tools/ToolBar";
import Images from "./tools/Images";
import DeleteMapModal from "@/app/components/DeleteMapModal";
import { useAppSelector } from "@/redux/hooks";
import { DisplayFormatNumber } from "../types/displayFormatSliceTypes";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const formatValue = useAppSelector((state) => state.dataFormat.value);
  const isDeleteMapClicked = useAppSelector(
    (state) => state.leftBar.isDeleteMapClicked
  );

  return (
    <div className="relative h-screen w-screen">
      {isDeleteMapClicked && <DeleteMapModal />}
      <div className="absolute top-0 z-50 h-[70px] w-full ">
        <HeaderBar />
      </div>
      <Allotment className="h-full w-full pt-[70px]">
        <Allotment.Pane preferredSize={180} minSize={0}>
          <LeftBar />
        </Allotment.Pane>
        <Allotment.Pane className="relative h-full">
          <ReactFlowProvider>
            <FormatConverter />
            <Images />
            {formatValue === DisplayFormatNumber.MIND_MAP ? (
              <Flow />
            ) : (
              <Outline />
            )}
            <Canvas canvasRef={canvasRef} />
            <ToolBar canvasRef={canvasRef} />
          </ReactFlowProvider>
        </Allotment.Pane>
        <Allotment.Pane preferredSize={220} minSize={190}>
          <RightBar />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
