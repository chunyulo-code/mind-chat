import { store } from "@/redux/store";
import { db } from "./firebase";
import {
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { Node, Edge } from "reactflow";
import { auth } from "./firebase";

const userUid = window.localStorage.getItem("uid");
const selectedMap = store.getState().userInfo.selectedMap;

export async function updateFSNodesNEdges() {
  const nodes = store.getState().flow.nodes;
  const edges = store.getState().flow.edges;

  if (userUid) {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    console.log(userDocSnap.exists());
    if (userDocSnap.exists()) {
      const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
      const mapDocSnap = await getDoc(mapDocRef);
      if (mapDocSnap.exists()) {
        await updateDoc(mapDocRef, {
          nodes: nodes,
          edges: edges,
          updatedTime: serverTimestamp()
        });
        console.log("Updated!!!");
      }
      return;
    }
    console.log("userDocSnap not exist");
    await setDoc(doc(db, "users", userUid), {
      email: auth.currentUser?.email,
      userName: auth.currentUser?.displayName
    });
    console.log(db, "users", userUid, "maps", selectedMap);
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
        console.log(
          `nodes: ${nodes.length}, updatedNodes: ${updatedNodes.length}`
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
  console.log(deletedEdges);
  if (userUid) {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
      const mapDocSnap = await getDoc(mapDocRef);
      if (mapDocSnap.exists()) {
        const edges = store.getState().flow.edges;
        const updatedEdges = edges.filter(
          (edge) => !deletedEdges.includes(edge)
        );
        console.log(
          `edges: ${edges.length}, updatedEdges: ${updatedEdges.length}`
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
        console.log(
          `nodes: ${nodes.length}, updatedNodes: ${updatedNodes.length}`
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

export async function updateFSLibrary() {
  const keywords = store.getState().library.value;
  if (userUid) {
    console.log("updateFSLibrary");
    const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
    console.log(userUid);
    const mapDocSnap = await getDoc(mapDocRef);
    if (mapDocSnap.exists()) {
      await updateDoc(mapDocRef, { library: keywords });
      console.log(mapDocSnap.data());
    }
  }
}
