"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import WordCloud from "react-d3-cloud";
import { scaleLinear } from "d3-scale";
import { useAppSelector } from "@/redux/hooks";

type WordData = {
  text: string;
  value: number;
};

type WordCloudSize = {
  width: number;
  height: number;
};

export default function Spotlight() {
  const wordCloudRef = useRef<HTMLDivElement>(null);
  const [wordCloudRendered, setWordCloudRendered] = useState(false);
  const [wordCloudSize, setWordCloudSize] = useState<WordCloudSize>({
    width: 0,
    height: 0
  });
  const gptResponse = useAppSelector((state) => state.gptResponse.allResponse);

  function sortByFrequency(text: string): WordData[] {
    const filteredData = text
      .split(/[^a-zA-Z0-9-]+/)
      .filter((text) => text !== "-");
    const wordFrequency: { [key: string]: number } = {};

    // 統計單字出現頻率
    filteredData.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    // 轉化為物件並按照順序排列
    const result = Object.entries(wordFrequency).map(([text, value]) => ({
      text,
      value
    }));

    result.sort((a, b) => b.value - a.value); // 按照频率降序排列

    return result;
  }

  const sortedData = sortByFrequency(gptResponse);
  const fontSize = useCallback(
    (word: WordData) => Math.log2(word.value) * 25,
    []
  );
  const rotate = useCallback(() => 0, []);
  const colorScale = scaleLinear()
    .domain([
      Math.min(...sortedData.map((d) => d.value)),
      Math.max(...sortedData.map((d) => d.value))
    ])
    .range(["#c5c6c7", "#66fcf1"] as any);
  const fill = useCallback((d: WordData, i: number) => {
    return colorScale(d.value);
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setWordCloudSize({ width, height });
      }
    });

    if (wordCloudRef.current) {
      resizeObserver.observe(wordCloudRef.current);
    }

    return () => {
      if (wordCloudRef.current) {
        resizeObserver.unobserve(wordCloudRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setWordCloudRendered(true);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden" ref={wordCloudRef}>
      {wordCloudRendered && (
        <WordCloud
          data={sortedData}
          width={wordCloudSize.width}
          height={wordCloudSize.height}
          fontSize={fontSize}
          rotate={rotate}
          spiral="archimedean"
          random={Math.random}
          fill={fill as any}
        />
      )}
    </div>
  );
}
