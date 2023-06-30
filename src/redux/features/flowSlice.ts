import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Edge,
  Node,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges
} from "reactflow";

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | undefined;
};

const initialState: FlowState = {
  nodes: [],
  edges: [],
  selectedNode: undefined
};

export const flow = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    addNodes: (state, action) => {
      state.nodes = state.nodes.concat(action.payload);
    },
    addEdges: (state, action) => {
      state.edges = state.edges.concat(action.payload);
    },
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    }
  }
});

export const {
  setNodes,
  setEdges,
  addNode,
  addNodes,
  addEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNode
} = flow.actions;

export default flow.reducer;
