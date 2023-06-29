import { createSlice } from "@reduxjs/toolkit";
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
import { initialNodes } from "../data/initialNodes";
import { initialEdges } from "../data/initialEdges";

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

const initialState = {
  nodes: initialNodes,
  edges: initialEdges
};

export const flow = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      console.log("setting nodes");
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
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
    }
  }
});

export const {
  setNodes,
  setEdges,
  addNodes,
  addEdges,
  onNodesChange,
  onEdgesChange,
  onConnect
} = flow.actions;

export default flow.reducer;
