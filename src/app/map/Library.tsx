const keywords: string[] = ["React.js", "ES6+", "Redux", "TypeScript"];

export default function Library() {
  return (
    <div className="flex h-full flex-col justify-between p-2">
      <div className="flex flex-wrap">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="m-1 rounded-full border border-mindchat-primary-dark px-3 py-1 text-xs text-white"
          >
            {keyword}
          </span>
        ))}
      </div>
      <div>
        <button className=" w-full rounded-full bg-mindchat-primary px-2 py-1 text-xs text-mindchat-bg-dark">
          Generate article
        </button>
        <button className="mt-1 w-full rounded-full bg-mindchat-primary px-2 py-1 text-xs text-mindchat-bg-dark">
          Generate structure
        </button>
      </div>
    </div>
  );
}
