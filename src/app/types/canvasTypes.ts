import { RefObject } from "react";

export type ClearCanvas = () => void;

export type CanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement> | null;
  ctx: RefObject<CanvasRenderingContext2D> | null;
  color: string;
};
