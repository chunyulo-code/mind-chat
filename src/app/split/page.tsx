"use client";
import SplitPane, { Pane } from "react-split-pane-next";

export default function page() {
  return (
    <div className="h-screen w-screen">
      <SplitPane split="vertical">
        <Pane>
          <div className="bg-red-300">A</div>
        </Pane>
        <Pane initialSize="200px" minSize="50px">
          <div className="bg-blue-300">C</div>
        </Pane>
      </SplitPane>
    </div>
  );
}
