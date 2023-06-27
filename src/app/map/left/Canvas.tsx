"use client";

import React, { useEffect, useState } from "react";
import { CanvasProps } from "../../types/canvasTypes";
import { useAppSelector } from "@/redux/hooks";
import { UserMode } from "@/app/types/userModeSliceTypes";

const Canvas = ({ canvasRef, ctx, color }: CanvasProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const userMode = useAppSelector((state) => state.userModeReducer.value);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");

    // context.stroke = '#f00000';
    // context.strokeWidth = '2';
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.fillStyle = "rgba(31,40,51,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height); // 填滿整個畫布

    ctx.current = context;
  }, []);

  useEffect(() => {
    ctx.current.strokeStyle = color;
  }, [color]);

  const handleMouseDown = ({ nativeEvent }) => {
    console.log("this");
    const { offsetX, offsetY } = nativeEvent;
    ctx.current.beginPath();
    ctx.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const handleMouseMove = ({ nativeEvent }) => {
    console.log("this");
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
  };
  const handleMouseUp = () => {
    ctx.current.closePath();
    setIsDrawing(false);
  };

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
};

export default Canvas;
