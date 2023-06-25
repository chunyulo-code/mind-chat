import React from "react";
import ChatGPT from "./ChatGPT";
import Outline from "./Outline";
import Flow from "./Flow";

export default function page() {
  return (
    <div className="h-screen w-screen">
      <ChatGPT />
      <Outline />
      <Flow />
    </div>
  );
}
