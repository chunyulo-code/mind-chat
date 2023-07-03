import { nanoid } from "nanoid";
import { store } from "@/redux/store";
import { Node, Edge } from "reactflow";

type EdgeProps = {
  id: string;
  source: string;
  target: string;
};

type CurrentNodeId = {
  h1: string | null;
  h2: string | null;
  h3: string | null;
  currentNodeId: string | null;
};

function generateNewNode(id: string, label: string) {
  const positionToGenerate = store.getState().flow.positionToGenerate;
  return {
    id,
    type: "custom",
    data: { label },
    position: positionToGenerate
  };
}

function generateNewEdge(edgeProps: EdgeProps) {
  return {
    id: edgeProps.id,
    source: edgeProps.source,
    target: edgeProps.target,
    animated: true
  };
}

export function convertStringToNodes(str: string) {
  const newTopicParentNodeId = store.getState().flow.newTopicParentNodeId;
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
      if (newTopicParentNodeId) {
        const newEdge: Edge = generateNewEdge({
          id: `e${newTopicParentNodeId}-${id}`,
          source: newTopicParentNodeId,
          target: id
        });
        edges.push(newEdge);
      }
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
