import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-mindchat-bg-dark p-24">
      <div className="flex w-1/2 flex-col items-center justify-center text-center">
        <h1 className="text-9xl text-mindchat-primary">Mind Chat</h1>
        <p className=" mt-8 leading-7 text-mindchat-secondary">
          MIND CHAT is a web application that facilitates visual thinking for
          users by combining mind maps and ChatGPT. Users can brainstorm
          creative ideas related to a topic and engage in follow-up questions
          based on selected keywords of interest. Additionally, they have the
          option to add interesting keywords to the database, which can be used
          to generate articles, diagrams, and more.
        </p>
        <a href="/map">
          <button className="mt-12 rounded-lg border border-mindchat-primary px-8 py-2 text-mindchat-secondary hover:bg-mindchat-primary hover:text-mindchat-bg-dark">
            Try it
          </button>
        </a>
      </div>
    </main>
  );
}
