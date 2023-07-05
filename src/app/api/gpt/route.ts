import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

// Config based on your key
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

// Enabling support for Edge runtimes
export const runtime = "edge";

export async function POST(req: Request) {
  // Your prompt
  const { messages } = await req.json();
  console.log("Received");
  console.log(messages);
  console.log("post request received");

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    max_tokens: 100,
    messages
    // messages: systemRule.concat(messages)
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
