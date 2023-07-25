"use client";
import React, { ReactElement, RefObject } from "react";
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
import { setColor } from "@/redux/features/canvasSlice";

type ToolBarProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
};

type Tool = {
  clickHandler: () => void;
  id: string;
  icon: ReactElement;
  toolTipText: string;
};

type ColorData = {
  colorCode: string;
  bgColor: string;
};

const colors = [
  { colorCode: "#42f0ed", bgColor: "bg-mindchat-primary" },
  { colorCode: "rgb(252, 165, 165)", bgColor: "bg-red-300" },
  { colorCode: "rgb(255, 171, 68)", bgColor: "bg-orange-400" },
  { colorCode: "rgb(250, 238, 129)", bgColor: "bg-yellow-200" },
  { colorCode: "rgb(161, 255, 158)", bgColor: "bg-green-300" },
  { colorCode: "rgb(151, 194, 255)", bgColor: "bg-blue-300" },
  { colorCode: "rgb(197, 156, 255)", bgColor: "bg-purple-300" }
];

export default function ToolBar({ canvasRef }: ToolBarProps) {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);

  function clearCanvas() {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

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
        }
      }

      if (userUid) {
        dispatch(addImageUrls(downloadUrls));
        updateFSImages();
      }
    }
  }

  const tools: Tool[] = [
    {
      clickHandler: () => dispatch(toMindMapMode()),
      id: "mindMap",
      icon: <RiMindMap />,
      toolTipText: "Set to mind map mode"
    },
    {
      clickHandler: () => dispatch(toDrawingMode()),
      id: "pen",
      icon: <MdCreate />,
      toolTipText: "Set to drawing mode"
    },
    {
      clickHandler: () => clearCanvas(),
      id: "eraser",
      icon: <BsEraser />,
      toolTipText: "Clean canvas"
    }
  ];

  function UploadButton() {
    return (
      <div title="Upload files">
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
      </div>
    );
  }

  function ToolButtons() {
    return (
      <>
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={tool.clickHandler}
            title={tool.toolTipText}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-mindchat-primary text-white"
          >
            {tool.icon}
          </div>
        ))}
        <UploadButton />
      </>
    );
  }

  function ColorButton({ colorData }: { colorData: ColorData }) {
    const colorHandler = () => {
      dispatch(setColor(colorData.colorCode));
    };

    return (
      <div
        key={colorData.colorCode}
        onClick={colorHandler}
        className={`h-7 w-7 cursor-pointer rounded-full ${colorData.bgColor}`}
      ></div>
    );
  }

  function ColorOptions() {
    return colors.map((colorData) => (
      <ColorButton key={colorData.colorCode} colorData={colorData} />
    ));
  }

  return (
    <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-mindchat-secondary bg-mindchat-bg-dark px-3 py-2">
      <ToolButtons />
      <div className="text-mindchat-secondary">|</div>
      <ColorOptions />
    </div>
  );
}
