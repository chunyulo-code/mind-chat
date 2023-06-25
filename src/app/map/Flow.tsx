"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import { nanoid } from "nanoid";
import CustomNode from "./mindChatNodes/CustomNode";
import { GptContext } from "../context/GptContext";

const nodeTypes = {
  custom: CustomNode
};

export default function Flow() {
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } =
    useContext(GptContext);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  //   function addNode() {
  //     const newId = nanoid();
  //     setNodes((prev) =>
  //       prev.concat({
  //         id: newId,
  //         type: "custom",
  //         data: { label: "New node" },
  //         parentNode: selectedNodeId,
  //         position: {
  //           x: 200,
  //           y: 0
  //         }
  //       })
  //     );
  //     setEdges((prev) =>
  //       prev.concat({
  //         id: `e${selectedNodeId}-${newId}`,
  //         source: selectedNodeId,
  //         target: newId,
  //         animated: true
  //       })
  //     );
  //   }

  //   useEffect(() => {
  //     const selectedNode = nodes.filter((node) => node.selected === true)[0];
  //     if (selectedNode) setSelectedNodeId(selectedNode.id);
  //   }, [nodes]);

  return (
    <>
      {/* <button
        className="cursor-pointer rounded-sm border border-black px-2 py-1"
        onClick={addNode}
      >
        Add nodes
      </button> */}
      <ReactFlow
        nodeTypes={nodeTypes}
        className="bg-mindchat-bg-dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </>
  );
}
