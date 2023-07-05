import { store } from "@/redux/store";
import { setNodes, setEdges } from "@/redux/features/flowSlice";
import { getLayoutedElements } from "../map/main/autoLayout";

type Direction = "LR" | "TB";
const dispatch = store.dispatch;

export default function onLayout(direction: Direction) {
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
