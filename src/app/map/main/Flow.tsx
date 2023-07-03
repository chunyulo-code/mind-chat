"use client";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Node,
  Edge
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/app/map/main/mindChatNodes/CustomNode";
import CustomInputNode from "./mindChatNodes/CustomInputNode";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useContextMenu from "@/app/hooks/useContextMenu";
import ContextMenu from "@/app/map/tools/ContextMenu";
import QuestionBar from "./QuestionBar";
import {
  setNodes,
  setEdges,
  addNode,
  addNodes,
  addEdges,
  setBufferNodes,
  setBufferEdges,
  updateNodes,
  updateEdges,
  mergeNodes,
  mergeEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNode,
  showQuestionBar,
  hideQuestionBar
} from "@/redux/features/flowSlice";
import { convertStringToNodes } from "@/app/utils/convertStringToNodes";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
import {
  nodesChangeHandler,
  edgesChangeHandler,
  onConnectHandler
} from "@/app/utils/reactFlowProps";
import onLayout from "@/app/utils/onLayout";

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

  useEffect(() => {
    if (gptStatus === GptStatus.DOING) {
      if (allResponse) {
        const convertedData: { nodes: Node[]; edges: Edge[] } =
          convertStringToNodes(allResponse);
        dispatch(setBufferNodes(convertedData.nodes));
        dispatch(setBufferEdges(convertedData.edges));
        dispatch(updateNodes());
        dispatch(updateEdges());
      }
    }
  }, [allResponse]);

  useEffect(() => {
    if (gptStatus === GptStatus.DONE) {
      dispatch(hideQuestionBar());
      dispatch(mergeNodes());
      dispatch(mergeEdges());
      onLayout("LR");
    }
  }, [gptStatus]);

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
