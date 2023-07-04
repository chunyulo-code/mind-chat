"use client";

import React, { useState } from "react";
import askTopic from "@/app/utils/askTopic";

export default function QuestionBar() {
  const [inputMsg, setInputMsg] = useState("");

  function submitHandler(e: React.FormEvent, question: string) {
    e.preventDefault();
    askTopic(question);
  }

  return (
    <div className="flexitems-center absolute left-1/2 top-1/2 z-50">
      <form onSubmit={(e) => submitHandler(e, inputMsg)}>
        <input
          type="text"
          placeholder="Type any topics..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="h-10 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mindchat-primary bg-transparent px-4 text-white"
        />
      </form>
    </div>
  );
}
