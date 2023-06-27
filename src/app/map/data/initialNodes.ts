import { Node } from "reactflow";
export const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "Input Node" },
    position: { x: 100, y: 400 }
  },
  {
    id: "2",
    type: "custom",
    data: { label: "Default Node" },
    position: { x: 300, y: 400 }
  },
  {
    id: "3",
    type: "custom",
    data: { label: "Output Node" },
    position: { x: 500, y: 400 }
  }
];
