"use client";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/app/map/main/mindChatNodes/CustomNode";
import CustomInputNode from "./mindChatNodes/CustomInputNode";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useContextMenu from "@/app/hooks/useContextMenu";
import ContextMenu from "@/app/map/tools/ContextMenu";
import { nanoid } from "nanoid";
import QuestionBar from "./QuestionBar";
import {
  setNodes,
  setEdges,
  addNodes,
  addEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNode,
  showQuestionBar,
  hideQuestionBar
} from "@/redux/features/flowSlice";
import { getLayoutedElements } from "./autoLayout";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";

const nodeTypes = {
  custom: CustomNode,
  customInput: CustomInputNode
};

export default function Flow() {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);
  const allResponse = useAppSelector((state) => state.gptResponse.allResponse);
  const gptStatus = useAppSelector((state) => state.gptResponse.gptStatus);
  const isAllowAsked = useAppSelector((state) => state.flow.isAllowAsked);
  const { clicked, setClicked, points, setPoints } = useContextMenu();

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
  };

  function generateNewNode(id: string, label: string) {
    return {
      id,
      type: "custom",
      data: { label },
      position: { x: 0, y: 0 }
    };
  }

  type EdgeProps = {
    id: string;
    source: string;
    target: string;
  };

  function generateNewEdge(edgeProps: EdgeProps) {
    return {
      id: edgeProps.id,
      source: edgeProps.source,
      target: edgeProps.target,
      animated: true
    };
  }

  type CurrentNodeId = {
    h1: string | null;
    h2: string | null;
    h3: string | null;
    currentNodeId: string | null;
  };

  function convertString(str: string) {
    const lines = str.trim().split("\n");
    const nodes = [];
    const edges = [];
    let currentNodeIds: CurrentNodeId = {
      h1: null,
      h2: null,
      h3: null,
      currentNodeId: null
    };

    for (let line of lines) {
      if (line.startsWith("# ")) {
        const label = line.substring(2).trim();
        const id = nanoid();
        const newNode: Node = generateNewNode(id, label);
        nodes.push(newNode);
        currentNodeIds.h1 = id;
        currentNodeIds.currentNodeId = id;
      } else if (line.startsWith("## ")) {
        const label = line.substring(3).trim();
        const id = nanoid();
        if (currentNodeIds.h1) {
          const parentNodeId = currentNodeIds.h1;
          const newNode: Node = generateNewNode(id, label);
          nodes.push(newNode);
          const newEdge: Edge = generateNewEdge({
            id: `e${parentNodeId}-${id}`,
            source: parentNodeId,
            target: id
          });
          edges.push(newEdge);
          currentNodeIds.h2 = id;
          currentNodeIds.currentNodeId = id;
        }
      } else if (line.startsWith("### ")) {
        const label = line.substring(4).trim();
        const id = nanoid();
        if (currentNodeIds.h2) {
          const parentNodeId = currentNodeIds.h2;
          const newNode: Node = generateNewNode(id, label);
          nodes.push(newNode);
          const newEdge: Edge = generateNewEdge({
            id: `e${parentNodeId}-${id}`,
            source: parentNodeId,
            target: id
          });
          edges.push(newEdge);
          currentNodeIds.h3 = id;
          currentNodeIds.currentNodeId = id;
        }
      } else if (line.startsWith("- ")) {
        const label = line.substring(2).trim();
        const id = nanoid();
        if (currentNodeIds.currentNodeId) {
          const parentNodeId = currentNodeIds.currentNodeId;
          const newNode: Node = generateNewNode(id, label);
          nodes.push(newNode);
          const newEdge: Edge = generateNewEdge({
            id: `e${parentNodeId}-${id}`,
            source: parentNodeId,
            target: id
          });
          edges.push(newEdge);
        }
      }
    }

    return { nodes, edges };
  }

  type Direction = "LR" | "TB";

  const onLayout = useCallback(
    (direction: Direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
      dispatch(setNodes([...layoutedNodes]));
      dispatch(setEdges([...layoutedEdges]));
    },
    [nodes, edges, dispatch]
  );

  useEffect(() => {
    if (gptStatus === GptStatus.DOING) {
      if (allResponse) {
        const convertedData: { nodes: Node[]; edges: Edge[] } =
          convertString(allResponse);
        dispatch(setNodes(convertedData.nodes));
        dispatch(setEdges(convertedData.edges));
      }
    }
  }, [allResponse]);

  useEffect(() => {
    if (gptStatus === GptStatus.DONE) {
      dispatch(hideQuestionBar());
      onLayout("LR");
    }
  }, [gptStatus]);

  function nodesChangeHandler(changes: NodeChange[]) {
    const selectedNode = nodes.filter(
      (node: Node) => node.selected === true
    )[0];
    dispatch(onNodesChange(changes));
    dispatch(setSelectedNode(selectedNode));
  }

  function edgesChangeHandler(changes: EdgeChange[]) {
    dispatch(onEdgesChange(changes));
  }

  function onConnectHandler(connection: Connection) {
    dispatch(onConnect(connection));
  }

  return (
    <ReactFlowProvider>
      <div className="absolute left-0 top-0 h-full w-full">
        {isAllowAsked && <QuestionBar />}
        <ReactFlow
          nodeTypes={nodeTypes}
          className="bg-mindchat-bg-dark"
          nodes={nodes}
          edges={edges}
          onNodesChange={nodesChangeHandler}
          onEdgesChange={edgesChangeHandler}
          onConnect={onConnectHandler}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        </ReactFlow>
        {clicked && <ContextMenu points={points} />}
      </div>
    </ReactFlowProvider>
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
