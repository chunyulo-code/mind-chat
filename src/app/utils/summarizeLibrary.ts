"use client";
import { systemResponseRules } from "./summarizeLibraryRules";
import {
  insertChunkToOutput,
  emptyOutput,
  setGptStatus
} from "@/redux/features/outputSlice";
import { store } from "@/redux/store";
import { GptStatus } from "../types/outputSliceTypes";
const API_URL = "https://api.openai.com/v1/chat/completions";

export default async function summarizeLibrary(keywords: string[]) {
  const dispatch = store.dispatch;
  const controller = new AbortController();
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemResponseRules
      },
      {
        role: "user",
        content: `${keywords.toString()}`
      }
    ],
    stream: true,
    max_tokens: 500
  };

  try {
    dispatch(emptyOutput());
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
              dispatch(insertChunkToOutput(" \n"));
            }
          } else {
            dispatch(insertChunkToOutput(newWord));
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
