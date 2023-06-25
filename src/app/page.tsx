import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24 bg-mindchat-bg-dark">
      <div className="w-1/2 flex flex-col items-center justify-center text-center">
        <h1 className="text-mindchat-primary text-9xl">Mind Chat</h1>
        <p className=" text-mindchat-secondary mt-8 leading-7">
          MIND CHAT is a web application that facilitates visual thinking for
          users by combining mind maps and ChatGPT. Users can brainstorm
          creative ideas related to a topic and engage in follow-up questions
          based on selected keywords of interest. Additionally, they have the
          option to add interesting keywords to the database, which can be used
          to generate articles, diagrams, and more.
        </p>
        <a href="/map">
          <button className="border border-mindchat-primary rounded-lg px-8 py-2 text-mindchat-secondary mt-12 hover:bg-mindchat-primary hover:text-mindchat-bg-dark">
            Try it
          </button>
        </a>
      </div>
    </main>
  );
}
