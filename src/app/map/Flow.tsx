"use client";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./mindChatNodes/CustomNode";
import { useAppSelector } from "@/redux/hooks";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { label: "Input Node" },
    position: { x: 100, y: 400 }
  },

  {
    id: "2",
    type: "custom",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 300, y: 400 }
  },
  {
    id: "3",
    type: "custom",
    data: { label: "Output Node" },
    position: { x: 500, y: 400 }
  }
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true }
];

const nodeTypes = {
  custom: CustomNode
};

export default function Flow() {
  const gptResponse = useAppSelector((state) => state.gptResponseReducer.value);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  useEffect(() => {
    console.log(gptResponse);
  }, [gptResponse]);
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
