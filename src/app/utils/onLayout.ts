import { store } from "@/redux/store";
import {
  setNodes,
  setEdges,
  setBufferNodes,
  setBufferEdges
} from "@/redux/features/flowSlice";
import { getLayoutedElements } from "../map/main/autoLayout";

type Direction = "LR" | "TB";
const dispatch = store.dispatch;

export function layoutNodes(direction: Direction) {
  const nodes = store.getState().flow.nodes;
  const edges = store.getState().flow.edges;
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes,
    edges,
    direction
  );
  dispatch(setNodes(layoutedNodes));
  dispatch(setEdges(layoutedEdges));
}

export function layoutBufferNodes(direction: Direction) {
  const bufferNodes = store.getState().flow.bufferNodes;
  const bufferEdges = store.getState().flow.bufferEdges;
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    bufferNodes,
    bufferEdges,
    direction
  );
  dispatch(setBufferNodes(layoutedNodes));
  dispatch(setBufferEdges(layoutedEdges));
}
