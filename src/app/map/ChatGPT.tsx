"use client";

import { useState, useEffect } from "react";
import { systemResponseRules } from "./gptRules";
import { nanoid } from "nanoid";
import { useEdges } from "reactflow";
import { setGptResponse } from "@/redux/features/gptResponseSlice";
import { useAppDispatch } from "@/redux/hooks";
const API_URL = "https://api.openai.com/v1/chat/completions";

export default function ChatGPT() {
  const dispatch = useAppDispatch();
  const [inputMsg, setInputMsg] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [newNodes, setNewNodes] = useState([]);
  const [isResfinished, setIsResFinished] = useState(true);
  const controller = new AbortController();

  let headingIds = {
    heading1: "",
    heading2: "",
    heading3: "",
    heading4: "",
    heading5: "",
    heading6: "",
    hyphen: ""
  };
  let prevLevel = 0;
  let currentNodeId = "";
  let currentString = "";

  function addChildNode(parentNodeId: String | null) {
    if (currentString) {
      const newNode = {
        id: currentNodeId,
        type: "custom",
        data: { label: currentString },
        parentNode: parentNodeId,
        position: {
          x: 200,
          y: 0
        }
      };
      console.log(newNode);
      setNewNodes((prev) => prev.concat(newNode));
    }
  }

  function generateNodes(str: string) {
    switch (str) {
      case "#":
        currentNodeId = nanoid();
        headingIds.heading1 = currentNodeId;
        break;
      case "##":
        prevLevel = 1;
        addChildNode(headingIds.heading1);
        currentNodeId = nanoid();
        headingIds.heading2 = currentNodeId;
        break;
      case "###":
        prevLevel = 2;
        addChildNode(headingIds.heading2);
        currentNodeId = nanoid();
        headingIds.heading3 = currentNodeId;
        break;
      case "####":
        prevLevel = 3;
        addChildNode(headingIds.heading3);
        currentNodeId = nanoid();
        headingIds.heading4 = currentNodeId;
        break;
      case "#####":
        prevLevel = 4;
        addChildNode(headingIds.heading4);
        currentNodeId = nanoid();
        headingIds.heading5 = currentNodeId;
        break;
      case "######":
        prevLevel = 5;
        addChildNode(headingIds.heading5);
        currentNodeId = nanoid();
        headingIds.heading6 = currentNodeId;
        break;
      case "-":
        addChildNode(headingIds[`heading${prevLevel}`]);
        currentNodeId = nanoid();
        headingIds.hyphen = currentNodeId;
        break;
      default:
        currentString += str;
    }
  }

  async function callGPT(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    question: string
  ) {
    e.preventDefault();

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemResponseRules
        },
        {
          role: "user",
          content: `${question}`
        }
      ],
      stream: true,
      max_tokens: 100
    };

    try {
      setIsResFinished(false);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_KEY}`
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      setResponseMessage("");

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsResFinished(true);
          break;
        }
        const chunk = decoder.decode(value);
        const lines = chunk
          .split("\n")
          .map((line) => line.replace("data: ", ""))
          .filter((line) => line.length > 0)
          .filter((line) => line !== "[DONE]")
          .map((line) => JSON.parse(line));
        for (const line of lines) {
          // console.log(line.choices[0].delta.content);
          const newWord = line.choices[0].delta.content;
          dispatch(setGptResponse(newWord));
          // console.log(newWord);
          // generateNodes(newWord);
          setResponseMessage((prev) => prev + newWord);
        }
      }
    } catch (error) {}
  }

  function stopHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    controller.abort();
  }

  useEffect(() => {
    // console.log(newNodes);
    // setNodes((prev) => prev.concat(newNodes));
  }, [isResfinished]);

  return (
    <div className=" absolute z-50 mt-2 flex flex-col items-center p-5">
      <form action="" className="mb-2">
        <h2 className="text-mindchat-bg-dark">Chat GPT</h2>
        <input
          type="text"
          className="rounded-lg border border-black px-2 text-black"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
        />
        <button
          onClick={(e) => {
            console.log("clicked");
            callGPT(e, inputMsg);
          }}
          className="ml-5 rounded-md border border-solid border-mindchat-primary px-2 py-2 text-mindchat-secondary"
        >
          Send Message
        </button>
        <button
          onClick={stopHandler}
          className="ml-5 rounded-md border border-solid border-mindchat-primary px-2 py-2 text-mindchat-secondary"
        >
          Stop
        </button>
        <div className="text-mindchat-secondary">{responseMessage}</div>
      </form>
    </div>
  );
}
