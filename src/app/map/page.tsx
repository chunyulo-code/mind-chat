"use client";
import SplitPane, { Pane } from "react-split-pane-next";
import ChatGPT from "./ChatGPT";
import Outline from "./Outline";
import Flow from "./Flow";
import RightBar from "./RightBar";
import ToolBar from "./ToolBar";

export default function page() {
  return (
    <div className="h-screen w-screen">
      <SplitPane split="vertical">
        <Pane className="relative">
          <ChatGPT />
          <Outline />
          <Flow />
          <ToolBar />
        </Pane>
        <Pane initialSize="200px" minSize="50px">
          <RightBar />
        </Pane>
      </SplitPane>
    </div>
  );
}
