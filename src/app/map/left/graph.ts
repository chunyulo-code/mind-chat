import ELK from "elkjs";
import { useAppSelector } from "@/redux/hooks";

export default function ElkLayout() {
  const nodes = useAppSelector((state) => state.flowReducer.nodes);
  const edges = useAppSelector((state) => state.flowReducer.edges);

  const elk = new ELK();

  const nodesForElk = nodes.map((node) => {
    return {
      id: node.id,
      width: node.type === "rectangleNode" ? 70 : 50,
      height: node.type === "rhombusNode" ? 70 : 50
    };
  });

  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "nodePlacement.strategy": "SIMPLE"
    },
    children: nodesForElk,
    edges: edges // 使用從 useSelector 獲取的 edges
  };

  return elk.layout(graph);
}
