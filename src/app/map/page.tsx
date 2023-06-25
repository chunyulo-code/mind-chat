"use client";
import SplitPane, { Pane } from "react-split-pane-next";
import ChatGPT from "./ChatGPT";
import Outline from "./Outline";
import Flow from "./Flow";
import RightBar from "./RightBar";

export default function page() {
  return (
    <div className="h-screen w-screen">
      <SplitPane split="vertical">
        <Pane>
          <ChatGPT />
          <Outline />
          <Flow />
        </Pane>
        <Pane initialSize="200px" minSize="50px">
          <RightBar />
        </Pane>
      </SplitPane>
    </div>
  );
}
