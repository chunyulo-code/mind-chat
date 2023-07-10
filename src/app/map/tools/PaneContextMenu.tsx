"use client";

import {
  addNode,
  hideQuestionBar,
  setNewTopicParentNodeId,
  showQuestionBar
} from "@/redux/features/flowSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nanoid } from "nanoid";
import { useReactFlow, Node } from "reactflow";

type Points = {
  x: number;
  y: number;
};

type PaneContextMenuProps = {
  points: Points;
};

type MenuList = {
  text: string;
  id: string;
  clickHandler: () => void;
};

export default function PaneContextMenu({ points }: PaneContextMenuProps) {
  const dispatch = useAppDispatch();
  const { project } = useReactFlow();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const selectedNode: Node | undefined = useAppSelector<Node | undefined>(
    (state) => state.flow.selectedNode
  );

  const menuLists: MenuList[] = [
    {
      text: "Add node",
      id: "addNode",
      clickHandler: () => {
        console.log("Add node clicked");
        dispatch(
          addNode({
            id: nanoid(),
            type: "customInput",
            data: { label: "newNode" },
            position: project({ x: points.x, y: points.y })
          })
        );
      }
    },
    {
      text: "Ask new topic",
      id: "AskNewTopic",
      clickHandler: () => {
        dispatch(setNewTopicParentNodeId(null));
        dispatch(showQuestionBar());
      }
    },
    {
      text: "Hide bar",
      id: "HideQuestionBar",
      clickHandler: () => {
        dispatch(hideQuestionBar());
      }
    }
  ];

  return (
    <div
      className="absolute w-[165px] rounded-md bg-mindchat-bg-dark shadow-md shadow-gray-900"
      style={{ top: `${points.y}px`, left: `${points.x}px` }}
    >
      <ul className="list-none p-2">
        {menuLists.map((menuList) => (
          <li
            key={menuList.id}
            id={menuList.id}
            onClick={menuList.clickHandler}
            className="rounded-lg px-4 py-2 text-mindchat-secondary hover:cursor-pointer hover:border hover:border-mindchat-primary"
          >
            {menuList.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
