"use client";
import { useRef, useState, useEffect } from "react";
import WordCloud from "react-d3-cloud";
import { scaleLinear } from "d3-scale";
import { useAppSelector } from "@/redux/hooks";
import { rgb } from "d3-color";

type WordData = {
  text: string;
  value: number;
};

type WordCloudSize = {
  width: number;
  height: number;
};

type WordCloudConfig = {
  fontSize: (wordData: WordData) => number;
  rotate: () => number;
  fill: (wordData: WordData, index: number) => string;
};

export function getValidWords(text: string): string[] {
  return text.split(/[^a-zA-Z0-9-]+/).filter((text) => text !== "-");
}

export function calculateWordFrequency(validWords: string[]) {
  const wordFrequency: { [key: string]: number } = {};

  validWords.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  return wordFrequency;
}

export function sortWordFrequency(wordFrequency: {
  [key: string]: number;
}): WordData[] {
  const result = Object.entries(wordFrequency).map(([text, value]) => ({
    text,
    value
  }));

  result.sort((a, b) => b.value - a.value);

  return result;
}

export function sortByFrequency(text: string): WordData[] {
  const validWords = getValidWords(text);
  const wordFrequency = calculateWordFrequency(validWords);
  const result = sortWordFrequency(wordFrequency);

  return result;
}

export function getWordCloudConfig(sortedData: WordData[]): WordCloudConfig {
  const colorScale = scaleLinear()
    .domain([
      Math.min(...sortedData.map((d) => d.value)),
      Math.max(...sortedData.map((d) => d.value))
    ])
    .range(["#c5c6c7", "#66fcf1"] as any);

  const fontSize = (wordData: WordData) => Math.log2(wordData.value) * 25;
  const rotate = () => 0;
  const fill = (wordData: WordData, index: number) =>
    String(colorScale(wordData.value));

  return {
    fontSize,
    rotate,
    fill
  };
}

export default function Spotlight() {
  const wordCloudRef = useRef<HTMLDivElement>(null);
  const [wordCloudRendered, setWordCloudRendered] = useState(false);
  const [wordCloudSize, setWordCloudSize] = useState<WordCloudSize>({
    width: 0,
    height: 0
  });

  const gptResponse = useAppSelector((state) => state.gptResponse.allResponse);
  const sortedData = sortByFrequency(gptResponse);
  const { fontSize, rotate, fill } = getWordCloudConfig(sortedData);

  useEffect(() => {
    setWordCloudRendered(true);

    const resizeObserver = new ResizeObserver((entries) => {
      const spotlightEntry = entries[0];
      const { width, height } = spotlightEntry.contentRect;
      setWordCloudSize({ width, height });
    });

    const currentWordCloudRef = wordCloudRef.current;

    if (currentWordCloudRef) {
      resizeObserver.observe(currentWordCloudRef);
    }

    return () => {
      if (currentWordCloudRef) {
        resizeObserver.unobserve(currentWordCloudRef);
      }
    };
  }, []);

  return (
    <div
      className="z-50 h-[calc(100%-28px-8px)] w-full overflow-hidden rounded-xl border border-mindchat-secondary shadow-md shadow-slate-700"
      ref={wordCloudRef}
    >
      {wordCloudRendered && (
        <WordCloud
          data={sortedData}
          width={wordCloudSize.width}
          height={wordCloudSize.height}
          fontSize={fontSize}
          rotate={rotate}
          spiral="archimedean"
          random={Math.random}
          fill={fill}
        />
      )}
    </div>
  );
}
