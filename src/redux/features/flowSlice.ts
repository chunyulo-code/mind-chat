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
  bufferNodes: Node[];
  bufferEdges: Edge[];
  selectedNode: Node | undefined;
  isAllowAsked: boolean;
};

const initialState: FlowState = {
  nodes: [],
  edges: [],
  bufferNodes: [],
  bufferEdges: [],
  selectedNode: undefined,
  isAllowAsked: true
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
    setBufferNodes: (state, action) => {
      state.bufferNodes = action.payload;
    },
    setBufferEdges: (state, action) => {
      state.bufferEdges = action.payload;
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
    },
    showQuestionBar: (state) => {
      state.isAllowAsked = true;
    },
    hideQuestionBar: (state) => {
      state.isAllowAsked = false;
    }
  }
});

export const {
  setNodes,
  setEdges,
  addNode,
  addNodes,
  addEdges,
  setBufferNodes,
  setBufferEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNode,
  showQuestionBar,
  hideQuestionBar
} = flow.actions;

export default flow.reducer;
