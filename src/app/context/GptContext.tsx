"use client";
import React, { useState } from "react";
import { useNodesState, useEdgesState } from "reactflow";
const GptContext = React.createContext();

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

function GptContextProvider(props) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  return (
    <GptContext.Provider
      value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }}
    >
      {props.children}
    </GptContext.Provider>
  );
}

export { GptContextProvider, GptContext };
