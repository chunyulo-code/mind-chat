import { Node } from "reactflow";
export const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "Input Node" },
    position: { x: 0, y: 0 }
  },
  {
    id: "2",
    type: "custom",
    data: { label: "Default Node" },
    position: { x: 0, y: 0 }
  },
  {
    id: "3",
    type: "custom",
    data: { label: "Output Node" },
    position: { x: 0, y: 0 }
  }
];
