import { store } from "@/redux/store";
import { Node, Edge } from "reactflow";
import { NodeChange, EdgeChange, Connection } from "reactflow";
import {
  onNodesChange,
  onEdgesChange,
  setSelectedNode,
  onConnect
} from "@/redux/features/flowSlice";

const dispatch = store.dispatch;
const nodes = store.getState().flow.nodes;

export function nodesChangeHandler(changes: NodeChange[]) {
  const selectedNode = nodes.filter((node: Node) => node.selected === true)[0];
  dispatch(onNodesChange(changes));
  dispatch(setSelectedNode(selectedNode));
}

export function edgesChangeHandler(changes: EdgeChange[]) {
  dispatch(onEdgesChange(changes));
}

export function onConnectHandler(connection: Connection) {
  dispatch(onConnect(connection));
}
