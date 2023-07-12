"use client";

import { store } from "@/redux/store";
import { db, auth } from "./firebase";
import {
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
  setDoc,
  addDoc,
  getDocs,
  collection
} from "firebase/firestore";
import { Node, Edge } from "reactflow";
import { nanoid } from "nanoid";
import { setAllMaps } from "@/redux/features/userInfoSlice";

export async function updateFSNodesNEdges() {
  const userUid = store.getState().userInfo.uid;
  const userEmail = store.getState().userInfo.email;
  const userDisplayName = store.getState().userInfo.displayName;
  const selectedMap = store.getState().userInfo.selectedMap;

  if (userUid) {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists() && selectedMap) {
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
      email: userEmail,
      userName: userDisplayName
    });

    if (selectedMap) {
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
      return;
    }

    if (!selectedMap) {
      const nodes = store.getState().flow.nodes;
      const edges = store.getState().flow.edges;
      const allMaps = store.getState().userInfo.allMaps;
      const newMapName = `New map - ${nanoid()}`;

      const newMapId = await addDoc(collection(db, "users", userUid, "maps"), {
        mapName: newMapName,
        nodes: nodes,
        edges: edges,
        photos: [],
        library: [],
        updatedTime: serverTimestamp()
      });

      if (newMapId) {
        const stringifiedNewMapId = newMapId.toString();

        store.dispatch(
          setAllMaps([
            { mapId: stringifiedNewMapId, mapName: newMapName },
            ...allMaps
          ])
        );
      }
    }
  }
}

export async function updateFSNodes(deletedNodes: Node[]) {
  const userUid = store.getState().userInfo.uid;
  const selectedMap = store.getState().userInfo.selectedMap;
  if (userUid && selectedMap) {
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
  const userUid = store.getState().userInfo.uid;
  const selectedMap = store.getState().userInfo.selectedMap;
  if (userUid && selectedMap) {
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
  const userUid = store.getState().userInfo.uid;
  const selectedMap = store.getState().userInfo.selectedMap;
  if (userUid && selectedMap) {
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
  const userUid = store.getState().userInfo.uid;
  const selectedMap = store.getState().userInfo.selectedMap;

  if (userUid && selectedMap) {
    const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
    const mapDocSnap = await getDoc(mapDocRef);
    if (mapDocSnap.exists()) {
      const keywords = store.getState().library.value;
      await updateDoc(mapDocRef, { library: keywords });
      console.log("updateFSLibrary updated");
    }
  }
}

export async function updateFSMapName(
  editableMapId: string,
  newMapName: string
) {
  const userUid = store.getState().userInfo.uid;

  if (userUid) {
    const mapDocRef = doc(db, "users", userUid, "maps", editableMapId);
    const mapDocSnap = await getDoc(mapDocRef);
    if (mapDocSnap.exists()) {
      await updateDoc(mapDocRef, {
        mapName: newMapName,
        updatedTime: serverTimestamp()
      });
      console.log("updateFSMapName: Updated!!!");
    }
  }
}

export async function FSAddNewMap(newMapName: string) {
  const userUid = store.getState().userInfo.uid;

  if (userUid) {
    const newMapId = await addDoc(collection(db, "users", userUid, "maps"), {
      mapName: newMapName,
      nodes: [],
      edges: [],
      photos: [],
      library: [],
      updatedTime: serverTimestamp()
    });

    return newMapId;
  }
}
