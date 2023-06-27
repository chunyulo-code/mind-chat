"use client";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { useAppSelector } from "@/redux/hooks";

export default function Images() {
  const imageUrls = useAppSelector((state) => state.imageUrlsReducer.value);
  return (
    <div className="absolute left-0 top-0 z-50 h-full">
      {imageUrls.map((imageUrl, index) => (
        <Draggable key={index}>
          <Resizable
            defaultSize={{
              width: 200,
              height: 360
            }}
            style={{
              background: `url(${imageUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
            lockAspectRatio={true}
          ></Resizable>
        </Draggable>
      ))}
    </div>
  );
}
