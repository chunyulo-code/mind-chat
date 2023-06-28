"use client";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
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
import { nanoid } from "nanoid";
import { gptResponse } from "@/redux/features/gptResponseSlice";

const nodeTypes = {
  custom: CustomNode
};

export default function Flow() {
  const allGptResponse = useAppSelector(
    (state) => state.gptResponseReducer.allResponse
  );
  const gptIncomingText = useAppSelector(
    (state) => state.gptResponseReducer.incomingText
  );
  const tempResponse = useAppSelector(
    (state) => state.gptResponseReducer.tempResponse
  );
  const isResponseDone = useAppSelector(
    (state) => state.gptResponseReducer.isResponseDone
  );
  const shouldGenerateNode = useAppSelector(
    (state) => state.gptResponseReducer.shouldGenerateNode
  );
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

  function convertString(str: string) {
    const lines = str.trim().split("\n");
    const nodes = [];
    let currentNode = null;

    for (let line of lines) {
      if (line.startsWith("# ")) {
        const label = line.substring(2).trim();
        currentNode = {
          id: nanoid(),
          type: "custom",
          data: { label },
          parentNode: undefined,
          position: { x: 200, y: 200 }
        };
        nodes.push(currentNode);
      } else if (line.startsWith("## ")) {
        const label = line.substring(3).trim();
        const newNode: Node = {
          id: nanoid(),
          type: "custom",
          data: { label },
          parentNode: currentNode ? currentNode.id : undefined,
          position: { x: 200, y: 0 }
        };
        nodes.push(newNode);
        currentNode = newNode;
      } else if (line.startsWith("### ")) {
        const label = line.substring(4).trim();
        const newNode: Node = {
          id: nanoid(),
          type: "custom",
          data: { label },
          parentNode: currentNode ? currentNode.id : undefined,
          position: { x: 200, y: 0 }
        };
        nodes.push(newNode);
        currentNode = newNode;
      } else if (line.startsWith("- ")) {
        const label = line.substring(2).trim();
        const newNode: Node = {
          id: nanoid(),
          type: "custom",
          data: { label },
          parentNode: currentNode ? currentNode.id : undefined,
          position: { x: 200, y: 0 }
        };
        nodes.push(newNode);
      }
    }

    return nodes;
  }

  useEffect(() => {
    if (allGptResponse && allGptResponse.length % 5 === 0) {
      setNodes(convertString(allGptResponse));
    }
  }, [allGptResponse]);

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
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
      {clicked && (
        <ContextMenu points={points} menuClickHandler={menuClickHandler} />
      )}
    </div>
  );
}

// const str_1 = `
// # FrontEnd Roadmap Here is a roadmap for FrontEnd developers to learn and improve their skills:
// ## HTML
// - Semantic Markup
// - Forms
// - Accessibility
// - SEO Optimization
// ## CSS
// - Box Model
// - Layout
// - Responsive Design
// - Animations
// - CSS Grid / Flexbox
// ## JavaScript
// - ES6+ Features
// - Algorithms and Data Structures
// - DOM Manipulation
// - Async Programming
// - Closures
// ## React
// - Components
// - JSX undefined`;

// const str_2 = [
//   {
//     id: "11",
//     type: "custom",
//     data: {
//       label:
//         "FrontEnd Roadmap Here is a roadmap for FrontEnd developers to learn and improve their skills:"
//     },
//     parentNode: "3",
//     position: {
//       x: 200,
//       y: 0
//     }
//   },
//   {
//     id: "22",
//     type: "custom",
//     data: { label: "HTML" },
//     parentNode: "11",
//     position: {
//       x: 200,
//       y: -300
//     }
//   },
//   {
//     id: "33",
//     type: "custom",
//     data: { label: "Semantic Markup" },
//     parentNode: "22",
//     position: {
//       x: 200,
//       y: -300
//     }
//   },
//   {
//     id: "44",
//     type: "custom",
//     data: { label: "Forms" },
//     parentNode: "22",
//     position: {
//       x: 200,
//       y: -100
//     }
//   },
//   {
//     id: "55",
//     type: "custom",
//     data: { label: "Accessibility" },
//     parentNode: "22",
//     position: {
//       x: 200,
//       y: 100
//     }
//   },
//   {
//     id: "66",
//     type: "custom",
//     data: { label: "SEO Optimization" },
//     parentNode: "22",
//     position: {
//       x: 200,
//       y: 300
//     }
//   },
//   {
//     id: "77",
//     type: "custom",
//     data: { label: "CSS" },
//     parentNode: "11",
//     position: {
//       x: 200,
//       y: 0
//     }
//   },
//   {
//     id: "88",
//     type: "custom",
//     data: { label: "Box Model" },
//     parentNode: "77",
//     position: {
//       x: 200,
//       y: -400
//     }
//   },
//   {
//     id: "99",
//     type: "custom",
//     data: { label: "Layout" },
//     parentNode: "77",
//     position: {
//       x: 200,
//       y: -200
//     }
//   },
//   {
//     id: "111",
//     type: "custom",
//     data: { label: "Responsive Design" },
//     parentNode: "77",
//     position: {
//       x: 200,
//       y: 0
//     }
//   },
//   {
//     id: "122",
//     type: "custom",
//     data: { label: "Animations" },
//     parentNode: "77",
//     position: {
//       x: 200,
//       y: 200
//     }
//   },
//   {
//     id: "133",
//     type: "custom",
//     data: { label: "CSS Grid / Flexbox" },
//     parentNode: "77",
//     position: {
//       x: 200,
//       y: 400
//     }
//   },
//   {
//     id: "144",
//     type: "custom",
//     data: { label: "JavaScript" },
//     parentNode: "11",
//     position: {
//       x: 200,
//       y: 100
//     }
//   },
//   {
//     id: "155",
//     type: "custom",
//     data: { label: "ES6+ Features" },
//     parentNode: "144",
//     position: {
//       x: 200,
//       y: -400
//     }
//   },
//   {
//     id: "166",
//     type: "custom",
//     data: { label: "Algorithms and Data Structures" },
//     parentNode: "144",
//     position: {
//       x: 200,
//       y: -200
//     }
//   },
//   {
//     id: "177",
//     type: "custom",
//     data: { label: "DOM Manipulation" },
//     parentNode: "144",
//     position: {
//       x: 200,
//       y: 0
//     }
//   },
//   {
//     id: "188",
//     type: "custom",
//     data: { label: "Async Programming" },
//     parentNode: "144",
//     position: {
//       x: 200,
//       y: 200
//     }
//   },
//   {
//     id: "199",
//     type: "custom",
//     data: { label: "Closures" },
//     parentNode: "144",
//     position: {
//       x: 200,
//       y: 400
//     }
//   },
//   {
//     id: "211",
//     type: "custom",
//     data: { label: "React" },
//     parentNode: "11",
//     position: {
//       x: 200,
//       y: 300
//     }
//   },
//   {
//     id: "222",
//     type: "custom",
//     data: { label: "Components" },
//     parentNode: "211",
//     position: {
//       x: 200,
//       y: -100
//     }
//   },
//   {
//     id: "233",
//     type: "custom",
//     data: { label: "JSX undefined" },
//     parentNode: "211",
//     position: {
//       x: 200,
//       y: 100
//     }
//   }
// ];
