"use client";
import { useEffect } from "react";
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
import NodeContextMenu from "@/app/map/tools/NodeContextMenu";
import PaneContextMenu from "../tools/PaneContextMenu";
import QuestionBar from "./QuestionBar";
import {
  setNodes,
  setEdges,
  addNode,
  addNodes,
  addEdges,
  setBufferNodes,
  setBufferEdges,
  setPrevNodes,
  setPrevEdges,
  updateNodes,
  updateEdges,
  mergeNodes,
  mergeEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNode,
  showQuestionBar,
  hideQuestionBar,
  setPositionToGenetate,
  setNewTopicParentNodeId
} from "@/redux/features/flowSlice";
import { convertStringToNodes } from "@/app/utils/convertStringToNodes";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
import {
  nodesChangeHandler,
  edgesChangeHandler,
  onConnectHandler
} from "@/app/utils/reactFlowProps";
import onLayout from "@/app/utils/onLayout";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/app/utils/firebase";
import {
  updateFSNodesNEdges,
  updateFSNodes,
  updateFSEdges,
  updateFSDraggedNodes
} from "@/app/utils/firestoreUpdater";

const nodeTypes = {
  custom: CustomNode,
  customInput: CustomInputNode
};

const HEADER_BAR_HEIGHT = 70;

export default function Flow() {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);
  const allResponse = useAppSelector((state) => state.gptResponse.allResponse);
  const gptStatus = useAppSelector((state) => state.gptResponse.gptStatus);
  const isAllowAsked = useAppSelector((state) => state.flow.isAllowAsked);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);

  const {
    clicked: nodeClicked,
    setClicked: setNodeClicked,
    points: nodePoints,
    setPoints: setNodePoints
  } = useContextMenu();
  const {
    clicked: paneClicked,
    setClicked: setPaneClicked,
    points: panePoints,
    setPoints: setPanePoints
  } = useContextMenu();

  const onNodeContextMenu: (e: React.MouseEvent) => void = (e) => {
    e.preventDefault();
    setNodeClicked(true);
    setNodePoints({
      x: e.pageX,
      y: e.pageY - HEADER_BAR_HEIGHT
    });
  };

  const onPaneContextMenu: (e: React.MouseEvent) => void = (e) => {
    e.preventDefault();
    setPaneClicked(true);
    setPanePoints({
      x: e.pageX,
      y: e.pageY - HEADER_BAR_HEIGHT
    });
  };

  useEffect(() => {
    async function fetchMapNodesNEdges() {
      const userUid = window.localStorage.getItem("uid");
      if (userUid) {
        const docRef = doc(db, "users", userUid, "maps", selectedMap);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedNodes = docSnap.data().nodes;
          const fetchedEdges = docSnap.data().edges;
          dispatch(setNodes(fetchedNodes));
          dispatch(setPrevNodes(fetchedNodes));
          dispatch(setPrevEdges(fetchedEdges));
          dispatch(setEdges(fetchedEdges));
          if (fetchedNodes.length) {
            dispatch(hideQuestionBar());
          }
        } else {
          console.log("Doc is not existed");
        }
      }
    }
    fetchMapNodesNEdges();
  }, []);

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
      updateFSNodesNEdges();
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
          onPaneContextMenu={onPaneContextMenu}
          onNodesDelete={(deletedNodes) => updateFSNodes(deletedNodes)}
          onEdgesDelete={(deletedEdges) => updateFSEdges(deletedEdges)}
          onNodeDragStop={(e, node, nodes) => updateFSDraggedNodes(nodes)}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        </ReactFlow>
        {nodeClicked && <NodeContextMenu points={nodePoints} />}
        {paneClicked && <PaneContextMenu points={panePoints} />}
      </div>
    </ReactFlowProvider>
  );
}
