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
  prevNodes: Node[];
  prevEdges: Edge[];
  positionToGenerate: { x: number; y: number };
  newTopicParentNodeId: string | null;
  selectedNode: Node | undefined;
  editableNode: Node | undefined;
  isAllowAsked: boolean;
};

const initialState: FlowState = {
  nodes: [],
  edges: [],
  bufferNodes: [],
  bufferEdges: [],
  prevNodes: [],
  prevEdges: [],
  positionToGenerate: { x: 0, y: 0 },
  newTopicParentNodeId: null,
  selectedNode: undefined,
  editableNode: undefined,
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
    setPrevNodes: (state, action) => {
      state.prevNodes = action.payload;
    },
    setPrevEdges: (state, action) => {
      state.prevEdges = action.payload;
    },
    syncPrevNodesNEdges: (state) => {
      state.prevNodes = state.nodes;
      state.prevEdges = state.edges;
    },
    updateNodes: (state) => {
      state.nodes = state.prevNodes.concat(state.bufferNodes);
    },
    updateEdges: (state) => {
      state.edges = state.prevEdges.concat(state.bufferEdges);
    },
    mergeNodes: (state) => {
      state.nodes = state.prevNodes.concat(state.bufferNodes);
      state.prevNodes = state.nodes;
      state.bufferNodes = [];
    },
    mergeEdges: (state) => {
      state.edges = state.prevEdges.concat(state.bufferEdges);
      state.prevEdges = state.edges;
      state.bufferEdges = [];
    },
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
      state.selectedNode = state.nodes.filter(
        (node) => node.selected === true
      )[0];
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
    setEditableNode: (state, action) => {
      state.editableNode = action.payload;
    },
    showQuestionBar: (state) => {
      state.isAllowAsked = true;
    },
    hideQuestionBar: (state) => {
      state.isAllowAsked = false;
    },
    setPositionToGenetate: (state, action) => {
      state.positionToGenerate = action.payload;
    },
    updatePositionToGenetate: (state) => {
      state.positionToGenerate.y = state.positionToGenerate.y + 10;
    },
    setNewTopicParentNodeId: (state, action) => {
      state.newTopicParentNodeId = action.payload;
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
  setPrevNodes,
  setPrevEdges,
  syncPrevNodesNEdges,
  updateNodes,
  updateEdges,
  mergeNodes,
  mergeEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNode,
  setEditableNode,
  showQuestionBar,
  hideQuestionBar,
  setPositionToGenetate,
  updatePositionToGenetate,
  setNewTopicParentNodeId
} = flow.actions;

export default flow.reducer;
