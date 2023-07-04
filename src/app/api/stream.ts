import express, { Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import http, { IncomingMessage } from "http";

// ...

app.post("/api/admin/testStream", async (req: Request, res: Response) => {
  const { password } = req.body;

  try {
    if (password !== process.env.ADMIN_PASSWORD) {
      res.send({ message: "Incorrect password" });
      return;
    }

    const completion = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "When was America founded?" }],
        stream: true
      },
      { responseType: "stream" }
    );

    const stream = completion.data as unknown as IncomingMessage;

    stream.on("data", (chunk: Buffer) => {
      const payloads = chunk.toString().split("\n\n");
      for (const payload of payloads) {
        if (payload.includes("[DONE]")) return;
        if (payload.startsWith("data:")) {
          const data = JSON.parse(payload.replace("data: ", ""));
          try {
            const chunk: undefined | string = data.choices[0].delta?.content;
            if (chunk) {
              console.log(chunk);
            }
          } catch (error) {
            console.log(`Error with JSON.parse and ${payload}.\n${error}`);
          }
        }
      }
    });

    stream.on("end", () => {
      setTimeout(() => {
        console.log("\nStream done");
        res.send({ message: "Stream done" });
      }, 10);
    });

    stream.on("error", (err: Error) => {
      console.log(err);
      res.send(err);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
