"use client";
import React, { useState, useEffect, ReactElement } from "react";
import { ClearCanvas } from "../../types/canvasTypes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toMindMapMode, toDrawingMode } from "@/redux/features/userModeSlice";
import { addImageUrls } from "@/redux/features/imageUrlsSlice";
import { RiMindMap } from "react-icons/ri";
import { MdCreate } from "react-icons/md";
import { BsEraser } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { storage } from "@/app/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateFSImages } from "@/app/utils/firestoreUpdater";

type ToolBarProps = {
  clearCanvas: ClearCanvas;
  setColor: (color: string) => void;
};

type Tool = {
  clickHandler: () => void;
  id: string;
  icon: ReactElement;
};

export default function ToolBar({ clearCanvas, setColor }: ToolBarProps) {
  const dispatch = useAppDispatch();
  const toMindMapModeHandler = () => dispatch(toMindMapMode());
  const toDrawingModeHandler = () => dispatch(toDrawingMode());
  const clearCanvasHandler = () => clearCanvas();
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const allImages = useAppSelector((state) => state.imageUrls.allImages);

  // function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const fileList = e.target.files;

  //   if (fileList) {
  //     const uploadedImages = Array.from(fileList);
  //     const downloadUrls: string[] = [];

  //     const uploadPromises = uploadedImages.map((image) => {
  //       if (userUid) {
  //         const ImageToUploadRef = ref(
  //           storage,
  //           `images/${userUid}/${selectedMap}-${image.name}`
  //         );

  //         return uploadBytes(ImageToUploadRef, image).then(() =>
  //           getDownloadURL(ImageToUploadRef).then((url) => {
  //             downloadUrls.push(url);
  //             console.log(downloadUrls);
  //           })
  //         );
  //       } else {
  //         return Promise.resolve();
  //       }
  //     });

  //     Promise.all(uploadPromises).then(() => {
  //       dispatch(addImageUrls(downloadUrls));
  //       updateFSImages();
  //     });
  //   }
  // }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (fileList) {
      const uploadedImages = Array.from(fileList);
      const downloadUrls: string[] = [];

      for (const image of uploadedImages) {
        if (userUid) {
          const ImageToUploadRef = ref(
            storage,
            `images/${userUid}/${selectedMap}-${image.name}`
          );

          await uploadBytes(ImageToUploadRef, image);
          const url = await getDownloadURL(ImageToUploadRef);
          downloadUrls.push(url);
          console.log(downloadUrls);
        }
      }

      if (userUid) {
        dispatch(addImageUrls(downloadUrls));
        updateFSImages();
      }
    }
  }

  const tools: Tool[] = [
    { clickHandler: toMindMapModeHandler, id: "mindMap", icon: <RiMindMap /> },
    { clickHandler: toDrawingModeHandler, id: "pen", icon: <MdCreate /> },
    { clickHandler: clearCanvasHandler, id: "eraser", icon: <BsEraser /> }
  ];

  const primaryClickHandler = () => {
    setColor("#42f0ed");
  };
  const redClickHandler = () => {
    setColor("rgb(252, 165, 165)");
  };
  const orangeClickHandler = () => {
    setColor("rgb(255, 171, 68)");
  };
  const yellowClickHandler = () => {
    setColor("rgb(250, 238, 129)");
  };
  const greenClickHandler = () => {
    setColor("rgb(161, 255, 158)");
  };
  const blueClickHandler = () => {
    setColor("rgb(151, 194, 255)");
  };
  const purpleClickHandler = () => {
    setColor("rgb(197, 156, 255)");
  };

  const colors = [
    { clickHandler: primaryClickHandler, colorName: "bg-mindchat-primary" },
    { clickHandler: redClickHandler, colorName: "bg-red-300" },
    { clickHandler: orangeClickHandler, colorName: "bg-orange-400" },
    { clickHandler: yellowClickHandler, colorName: "bg-yellow-200" },
    { clickHandler: greenClickHandler, colorName: "bg-green-300" },
    { clickHandler: blueClickHandler, colorName: "bg-blue-300" },
    { clickHandler: purpleClickHandler, colorName: "bg-purple-300" }
  ];

  return (
    <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-mindchat-secondary px-3 py-2">
      {tools.map((tool) => (
        <div
          key={tool.id}
          onClick={tool.clickHandler}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-mindchat-primary text-white"
        >
          {tool.icon}
        </div>
      ))}
      <form>
        <label
          htmlFor="inputFiles"
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-mindchat-primary text-white"
        >
          <MdAttachFile />
          <span className="hidden">Upload</span>
        </label>
        <input
          id="inputFiles"
          className="hidden"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </form>

      <div className="text-mindchat-secondary">|</div>
      {colors.map((color) => (
        <div
          key={color.colorName}
          onClick={color.clickHandler}
          className={`h-7 w-7 cursor-pointer rounded-full ${color.colorName}`}
        ></div>
      ))}
    </div>
  );
}
