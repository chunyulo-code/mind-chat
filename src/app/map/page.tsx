"use client";
import SplitPane, { Pane } from "react-split-pane-next";
import ChatGPT from "./ChatGPT";
import Outline from "./Outline";
import Flow from "./Flow";
import RightBar from "./RightBar";
import ToolBar from "./ToolBar";
import FormatConverter from "./FormatConverter";
import { useAppSelector } from "@/redux/hooks";
import { FormatNumber } from "../types/formatSliceTypes";

export default function page() {
  const formatValue = useAppSelector((state) => state.dataFotmatReducer.value);

  return (
    <div className="h-screen w-screen">
      <SplitPane split="vertical">
        <Pane className="relative">
          <FormatConverter />
          <ChatGPT />
          {formatValue === FormatNumber.MIND_MAP ? <Flow /> : <Outline />}
          <ToolBar />
        </Pane>
        <Pane initialSize="200px" minSize="50px">
          <RightBar />
        </Pane>
      </SplitPane>
    </div>
  );
}
