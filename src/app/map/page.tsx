import React from "react";
import ChatGPT from "./ChatGPT";
import Outline from "./Outline";
import Flow from "./Flow";
import { GptContextProvider } from "../context/GptContext";

export default function page() {
  return (
    <GptContextProvider>
      <div className="h-screen w-screen">
        <ChatGPT />
        <Outline />
        <Flow />
      </div>
    </GptContextProvider>
  );
}
