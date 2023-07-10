"use client";

import { store } from "@/redux/store";
import { db, auth } from "./firebase";
import {
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
  setDoc,
  getDocs,
  collection
} from "firebase/firestore";
import { Node, Edge } from "reactflow";

const userUid = auth.currentUser?.uid;

export async function updateFSNodesNEdges() {
  if (userUid) {
    const selectedMap = store.getState().userInfo.selectedMap;
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
      const mapDocSnap = await getDoc(mapDocRef);
      if (mapDocSnap.exists()) {
        const nodes = store.getState().flow.nodes;
        const edges = store.getState().flow.edges;
        await updateDoc(mapDocRef, {
          nodes: nodes,
          edges: edges,
          updatedTime: serverTimestamp()
        });
        console.log("updateFSNodesNEdges Updated!!!");
      }
      return;
    }
    console.log("userDocSnap not exist");
    await setDoc(doc(db, "users", userUid), {
      email: auth.currentUser?.email,
      userName: auth.currentUser?.displayName
    });
    const nodes = store.getState().flow.nodes;
    const edges = store.getState().flow.edges;
    await setDoc(doc(db, "users", userUid, "maps", selectedMap), {
      nodes: nodes,
      edges: edges,
      photos: [],
      library: [],
      updatedTime: serverTimestamp()
    });
    console.log("Set Doc successfully");
  }
}

export async function updateFSNodes(deletedNodes: Node[]) {
  const selectedMap = store.getState().userInfo.selectedMap;
  if (userUid) {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
      const mapDocSnap = await getDoc(mapDocRef);
      if (mapDocSnap.exists()) {
        const nodes = store.getState().flow.nodes;
        const updatedNodes = nodes.filter(
          (node) => !deletedNodes.includes(node)
        );
        await updateDoc(mapDocRef, {
          nodes: updatedNodes,
          updatedTime: serverTimestamp()
        });
        console.log("Updated!!!");
      }
      return;
    }
    console.log("userDoc not existed");
  }
}

export async function updateFSEdges(deletedEdges: Edge[]) {
  if (userUid) {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const selectedMap = store.getState().userInfo.selectedMap;
      const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
      const mapDocSnap = await getDoc(mapDocRef);
      if (mapDocSnap.exists()) {
        const edges = store.getState().flow.edges;
        const updatedEdges = edges.filter(
          (edge) => !deletedEdges.includes(edge)
        );
        await updateDoc(mapDocRef, {
          edges: updatedEdges,
          updatedTime: serverTimestamp()
        });
        console.log("Updated!!!");
      }
      return;
    }
    console.log("userDoc not existed");
  }
}

export async function updateFSDraggedNodes(draggedNodes: Node[]) {
  if (userUid) {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const selectedMap = store.getState().userInfo.selectedMap;
      const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
      const mapDocSnap = await getDoc(mapDocRef);
      if (mapDocSnap.exists()) {
        const nodes = store.getState().flow.nodes;
        const updatedNodes = nodes.map((node) => {
          const matchedNode = draggedNodes.find(
            (draggedNode) => draggedNode.id === node.id
          );
          return matchedNode ? matchedNode : node;
        });
        await updateDoc(mapDocRef, {
          nodes: updatedNodes,
          updatedTime: serverTimestamp()
        });
        console.log("Updated!!!");
      }
      return;
    }
    console.log("userDoc not existed");
  }
}

export async function updateFSLibrary() {
  if (userUid) {
    const selectedMap = store.getState().userInfo.selectedMap;
    const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
    const mapDocSnap = await getDoc(mapDocRef);
    if (mapDocSnap.exists()) {
      const keywords = store.getState().library.value;
      await updateDoc(mapDocRef, { library: keywords });
      console.log("updateFSLibrary updated");
    }
  }
}

export async function FSAddNewMap(newMapName: string) {
  if (userUid) {
    await setDoc(doc(db, "users", userUid, "maps", newMapName), {
      nodes: [],
      edges: [],
      photos: [],
      library: [],
      updatedTime: serverTimestamp()
    });
  }
}
