"use client";
import React, { useEffect } from "react";
import { toMindMap, toOutline } from "@/redux/features/displayFormatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGptStatus } from "@/redux/features/outputSlice";
import { GptStatus } from "@/app/types/outputSliceTypes";
import { RiMindMap } from "react-icons/ri";
import { RiArrowLeftSFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineOutput } from "react-icons/md";
import { TbLayout2 } from "react-icons/tb";
import { nanoid } from "nanoid";
import { useChat } from "ai/react";
import { systemResponseRules } from "@/app/constants/summarizeSelectedDataRules";
import { ChatCompletionResponseMessageRoleEnum } from "openai-edge";
import { emptyOutput, setOutput } from "@/redux/features/outputSlice";
import { layoutNodes } from "@/app/utils/onLayout";
import { updateFSNodesNEdges } from "@/app/utils/firestoreUpdater";

export default function FormatConverter() {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);

  function toggleLeftBar() {}

  function toMindMapHandler() {
    dispatch(toMindMap());
  }
  function toOutlineHandler() {
    dispatch(setGptStatus(GptStatus.STAND_BY));
    dispatch(toOutline());
  }

  const { messages, setInput, handleSubmit } = useChat({
    api: "/api/gpt",
    initialMessages: [
      {
        id: nanoid(),
        role: ChatCompletionResponseMessageRoleEnum.System,
        content: systemResponseRules
      }
    ],
    onResponse: () => {
      dispatch(emptyOutput());
      dispatch(setGptStatus(GptStatus.DOING));
    },
    onFinish: () => {
      dispatch(setGptStatus(GptStatus.DONE));
    }
  });

  function summarizeSelectedData() {
    const selectedNodes = nodes.filter((node) => node.selected === true);
    const selectedEdges = edges.filter((edge) => edge.selected === true);

    const simplifiedNodes = selectedNodes.map((node) => ({
      id: node.id,
      data: {
        label: node.data.label
      }
    }));

    const question = `nodes: ${JSON.stringify(
      simplifiedNodes
    )}, edges: ${JSON.stringify(selectedEdges)}`;
    setInput(question);
  }

  useEffect(() => {
    if (messages && messages.length !== 1) {
      dispatch(setOutput(messages.slice(-1)[0].content));
    }
  }, [messages, dispatch]);

  const buttonStyle = `flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-mindchat-primary text-white hover:text-mindchat-primary`;
  const buttons = [
    {
      id: "toggleLeftMenu",
      icon: <RiArrowLeftSFill />,
      style: `${buttonStyle} border-0 text-2xl`,
      clickHandler: () => toggleLeftBar(),
      toolTipText: "Toggle left pane"
    },
    {
      id: "toMindMap",
      icon: <RiMindMap />,
      style: buttonStyle,
      clickHandler: () => toMindMapHandler(),
      toolTipText: "Set to mind map mode"
    },
    {
      id: "toOutline",
      icon: <AiOutlineMenu />,
      style: buttonStyle,
      clickHandler: () => toOutlineHandler(),
      toolTipText: "Set to outline mode"
    },
    {
      id: "reLayout",
      icon: <TbLayout2 />,
      style: buttonStyle,
      clickHandler: () => {
        layoutNodes("LR");
        updateFSNodesNEdges();
      },
      toolTipText: "Re-layout"
    }
  ];

  return (
    <div className="absolute left-5 top-5 z-50 flex gap-2 rounded-lg bg-mindchat-bg-dark-darker px-5 py-2 shadow-sm shadow-gray-900">
      {buttons.map((button) => (
        <div
          key={button.id}
          className={button.style}
          title={button.toolTipText}
          onClick={button.clickHandler}
        >
          {button.icon}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <button
          title="Summarize pane"
          type="submit"
          className={buttonStyle}
          onClick={summarizeSelectedData}
        >
          <MdOutlineOutput />
        </button>
      </form>
    </div>
  );
}
