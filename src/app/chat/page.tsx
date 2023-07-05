"use client";

import { useState } from "react";

export default function Page() {
  const [keyword, setKeyword] = useState("");
  async function addKeyword(word: String) {
    const res = await fetch("/api/library/addKeyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ keyword: word })
    });
  }

  return (
    <div>
      <label>
        Keyword:
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-black"
        />
      </label>
      <button
        type="button"
        className="rounded-md bg-black p-1 text-white"
        onClick={() => {
          addKeyword(keyword);
        }}
      >
        Add Keyword
      </button>
    </div>
  );
}
