"use client";

import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Node,
  Edge,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/app/map/main/mindChatNodes/CustomNode";
import useContextMenu from "@/app/hooks/useContextMenu";
import NodeContextMenu from "@/app/map/tools/NodeContextMenu";
import PaneContextMenu from "../tools/PaneContextMenu";
import QuestionBar from "./QuestionBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setNodes,
  setEdges,
  setBufferNodes,
  setBufferEdges,
  setPrevNodes,
  setPrevEdges,
  updateNodes,
  updateEdges,
  mergeNodes,
  mergeEdges,
  setEditableNode,
  hideQuestionBar
} from "@/redux/features/flowSlice";
import { setEditableMapId } from "@/redux/features/userInfoSlice";
import { convertStringToNodes } from "@/app/utils/convertStringToNodes";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";
import {
  nodesChangeHandler,
  edgesChangeHandler,
  onConnectHandler
} from "@/app/utils/reactFlowProps";
import { layoutNodes } from "@/app/utils/onLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebase";
import {
  updateFSNodesNEdges,
  updateFSNodes,
  updateFSEdges,
  updateFSDraggedNodes
} from "@/app/utils/firestoreUpdater";
import { setSelectedImage } from "@/redux/features/imageUrlsSlice";

const nodeTypes = {
  custom: CustomNode
};

const edgeOptions = {
  animated: true
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
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const leftBarWidth = useAppSelector((state) => state.leftBar.width);
  const { fitView } = useReactFlow();

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
    /**
     * add 30 to leftBarWidth to make the position of context menu displat correctly
     */
    setNodePoints({
      x: e.pageX - leftBarWidth - 30,
      y: e.pageY - HEADER_BAR_HEIGHT
    });
  };

  const onPaneContextMenu: (e: React.MouseEvent) => void = (e) => {
    e.preventDefault();
    setPaneClicked(true);
    setPanePoints({
      x: e.pageX - leftBarWidth - 30,
      y: e.pageY - HEADER_BAR_HEIGHT
    });
  };

  useEffect(() => {
    async function fetchSelectedMapNodesNEdges() {
      if (userUid && selectedMap) {
        const docRef = doc(db, "users", userUid, "maps", selectedMap);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedNodes = docSnap.data().nodes;
          const fetchedEdges = docSnap.data().edges;
          dispatch(setNodes(fetchedNodes));
          dispatch(setPrevNodes(fetchedNodes));
          dispatch(setEdges(fetchedEdges));
          dispatch(setPrevEdges(fetchedEdges));
          if (fetchedNodes?.length) {
            dispatch(hideQuestionBar());
          }
        } else {
          console.error("Doc is not existed");
        }
      }
    }

    fetchSelectedMapNodesNEdges();

    setTimeout(() => fitView(), 300);
  }, [userUid, selectedMap, dispatch, fitView]);

  useEffect(() => {
    function updateNodesFromGptResponse() {
      if (gptStatus === GptStatus.DOING) {
        if (allResponse) {
          const convertedData: { nodes: Node[]; edges: Edge[] } =
            convertStringToNodes(allResponse);

          dispatch(setBufferNodes(convertedData.nodes));
          dispatch(setBufferEdges(convertedData.edges));
          dispatch(updateNodes());
          dispatch(updateEdges());

          fitView();
        }
      }
    }

    updateNodesFromGptResponse();
  }, [allResponse, gptStatus, dispatch, fitView]);

  useEffect(() => {
    function organizeResult() {
      if (gptStatus === GptStatus.DONE) {
        dispatch(hideQuestionBar());

        dispatch(mergeNodes());
        dispatch(mergeEdges());
        layoutNodes("LR");
        updateFSNodesNEdges();

        setTimeout(() => {
          fitView();
        }, 300);
      }
    }

    organizeResult();
  }, [gptStatus, dispatch, fitView]);

  return (
    <div className="absolute left-0 top-0 flex h-full w-full">
      {isAllowAsked && <QuestionBar />}
      <ReactFlow
        onInit={() => fitView()}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
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
        onNodeDoubleClick={(e, Node) => dispatch(setEditableNode(Node))}
        onPaneClick={() => {
          dispatch(setEditableNode(undefined));
          dispatch(setEditableMapId(undefined));
          dispatch(setSelectedImage(null));
        }}
        fitView
        minZoom={0.1}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
      {nodeClicked && <NodeContextMenu points={nodePoints} />}
      {paneClicked && <PaneContextMenu points={panePoints} />}
    </div>
  );
}
