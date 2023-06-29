"use client";

import { useState, useEffect } from "react";
import { systemResponseRules } from "@/app/map/left/gptRules";
import {
  setGptResponse,
  setGptIncomingText,
  setGptStatus
} from "@/redux/features/gptResponseSlice";
import { useAppDispatch } from "@/redux/hooks";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
const API_URL = "https://api.openai.com/v1/chat/completions";

export default function ChatGPT() {
  const dispatch = useAppDispatch();
  const [inputMsg, setInputMsg] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const controller = new AbortController();

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
      dispatch(setGptStatus(GptStatus.DOING));
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_KEY}`
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      const responseBody = response.body;
      if (responseBody) {
        // Read the response as a stream of data
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        setResponseMessage("");

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            dispatch(setGptStatus(GptStatus.DONE));
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
            const newWord = line.choices[0].delta.content;
            if (newWord === " \n" || newWord === " \n\n") {
              {
                dispatch(setGptResponse(" \n"));
                // dispatch(setGptIncomingText(" \n"));
              }
            } else {
              dispatch(setGptResponse(newWord));
              // dispatch(setGptIncomingText(newWord));
            }
            setResponseMessage((prev) => prev + newWord);
          }
        }
      }
    } catch (error) {}
  }

  function stopHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    controller.abort();
  }

  return (
    <div className=" absolute top-10 z-50 flex flex-col items-center p-5">
      <form action="" className="mb-2">
        <h2 className="text-white">Chat GPT</h2>
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
