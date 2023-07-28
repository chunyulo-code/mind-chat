"use client";

import { useEffect, useState, useRef, RefObject, useCallback } from "react";
import { useAppSelector } from "@/redux/hooks";
import { UserMode } from "@/app/types/userModeSliceTypes";

type CanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement> | null;
};

function Canvas({ canvasRef }: CanvasProps) {
  const color = useAppSelector((state) => state.canvas.color);
  const userMode = useAppSelector((state) => state.userMode.value);
  const [isDrawing, setIsDrawing] = useState(false);

  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  function handleMouseDown(event: React.MouseEvent) {
    const { offsetX, offsetY } = event.nativeEvent;

    if (ctx && ctx.current) {
      ctx.current.beginPath();
      ctx.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = event.nativeEvent;
    if (ctx && ctx.current) {
      ctx.current.lineTo(offsetX, offsetY);
      ctx.current.stroke();
    }
  }

  function handleMouseUp() {
    if (ctx && ctx.current) {
      ctx.current.closePath();
    }

    setIsDrawing(false);
  }

  useEffect(() => {
    function initializeCanvas() {
      if (!canvasRef || !canvasRef.current) return;

      const canvas = canvasRef.current;
      canvas.height = window.innerHeight * 2;
      canvas.width = window.innerWidth * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext("2d", { willReadFrequently: true })!;
      context.scale(2, 2);
      context.lineCap = "round";
      context.lineWidth = 5;
      context.fillStyle = "rgba(31, 40, 51, 0.1)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      ctx.current = context;
    }

    initializeCanvas();
  }, [canvasRef]);

  useEffect(() => {
    if (ctx && ctx.current) {
      ctx.current.strokeStyle = color;
    }
  }, [color]);

  return (
    <div
      className={`absolute left-0 top-0 h-full w-full overflow-hidden ${
        userMode === UserMode.DRAWING ? "z-10" : "-z-10"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
