"use client";

import { addNode, setNodes } from "@/redux/features/flowSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nanoid } from "nanoid";
import { useReactFlow } from "reactflow";

type Points = {
  x: number;
  y: number;
};

type ContextMenuProps = {
  points: Points;
};

type MenuList = {
  text: string;
  id: string;
  clickHandler: () => void;
};

type Node = {
  data: {
    label: string;
  };
};

export default function ContextMenu({ points }: ContextMenuProps) {
  const dispatch = useAppDispatch();
  const { project } = useReactFlow();
  const nodes = useAppSelector((state) => state.flowReducer.nodes);
  const selectedNode: Node | undefined = useAppSelector<Node | undefined>(
    (state) => state.flowReducer.selectedNode
  );
  const textToCopy = selectedNode?.data.label;

  function deleteSelectedNode(selectedNode: Node | null) {
    if (selectedNode) {
      const filteredNodes = nodes.filter((node) => node.id !== selectedNode.id);
      dispatch(setNodes(filteredNodes));
    }
  }

  async function copyTextToClipboard(text: string | undefined) {
    if (text !== undefined) {
      await navigator.clipboard.writeText(text);
    }
  }

  const menuLists: MenuList[] = [
    {
      text: "Copy",
      id: "copy",
      clickHandler: () => {
        copyTextToClipboard(textToCopy);
      }
    },
    {
      text: "Delete",
      id: "delete",
      clickHandler: () => {
        if (selectedNode) deleteSelectedNode(selectedNode);
      }
    },
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
      text: "Add to library",
      id: "AddToLibrary",
      clickHandler: () => {
        console.log("Add to library clicked");
      }
    }
  ];

  return (
    <div
      className="absolute w-[160px] rounded-md bg-mindchat-bg-dark shadow-md shadow-gray-900"
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
