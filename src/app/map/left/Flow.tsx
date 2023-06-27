"use client";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  addEdge,
  OnConnect
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/app/map/left/mindChatNodes/CustomNode";
import { useAppSelector } from "@/redux/hooks";
import useContextMenu from "@/app/hooks/useContextMenu";
import ContextMenu from "@/app/map/tools/ContextMenu";
import { initialNodes } from "@/app/map/data/initialNodes";
import { initialEdges } from "@/app/map/data/initialEdges";

const nodeTypes = {
  custom: CustomNode
};

export default function Flow() {
  const gptResponse = useAppSelector((state) => state.gptResponseReducer.value);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const { clicked, setClicked, points, setPoints } = useContextMenu();

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeContextMenu: (e: React.MouseEvent, node: Node) => void = (
    e,
    node
  ) => {
    e.preventDefault();
    setClicked(true);
    setPoints({
      x: e.pageX,
      y: e.pageY
    });
    console.log("Right Click", e.pageX, e.pageY);
  };

  const menuClickHandler = (e: React.MouseEvent) => {
    const targetId = (e.target as HTMLDivElement).id;
    console.log(`${targetId} is clicked`);
  };

  useEffect(() => {
    console.log(gptResponse);
  }, [gptResponse]);

  useEffect(() => {
    const selectedNode: Node = nodes.filter(
      (node) => node.selected === true
    )[0];
    if (selectedNode) setSelectedNodeId(selectedNode.id);
  }, [nodes]);

  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        className="bg-mindchat-bg-dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
      />
      {clicked && (
        <ContextMenu points={points} menuClickHandler={menuClickHandler} />
      )}
    </div>
  );
}
