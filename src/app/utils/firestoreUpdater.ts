"use client";

import { store } from "@/redux/store";
import { db } from "./firebase";
import {
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
  setDoc,
  addDoc,
  collection,
  deleteDoc
} from "firebase/firestore";
import { Node, Edge } from "reactflow";
import { setAllMaps, setSelectedMap } from "@/redux/features/userInfoSlice";
import { setImageUrls } from "@/redux/features/imageUrlsSlice";

export async function updateFSNodesNEdges() {
  const userUid = store.getState().userInfo.uid;
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
      }
      return;
    }

    if (!selectedMap) {
      const nodes = store.getState().flow.nodes;
      const edges = store.getState().flow.edges;
      const allMaps = store.getState().userInfo.allMaps;
      const newMapName = "New map";

      const newMapRef = doc(collection(db, "users", userUid, "maps"));
      await setDoc(newMapRef, {
        mapName: newMapName,
        nodes: nodes,
        edges: edges,
        images: [],
        library: [],
        updatedTime: serverTimestamp()
      });

      const generatedId = newMapRef.id;

      if (generatedId) {
        store.dispatch(
          setAllMaps([{ mapId: generatedId, mapName: newMapName }, ...allMaps])
        );
        store.dispatch(setSelectedMap(generatedId));
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
      }
      return;
    }
    console.error("userDoc not existed");
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
      }
      return;
    }
    console.error("userDoc not existed");
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
      }
      return;
    }
    console.error("userDoc not existed");
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
      await updateDoc(mapDocRef, {
        library: keywords,
        updatedTime: serverTimestamp()
      });
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
    }
  }
}

export async function FSAddNewMap() {
  const userUid = store.getState().userInfo.uid;

  if (userUid) {
    const newMapId = await addDoc(collection(db, "users", userUid, "maps"), {
      mapName: "New map",
      nodes: [],
      edges: [],
      images: [],
      library: [],
      updatedTime: serverTimestamp()
    });

    return newMapId.id;
  }
}

export async function FSDeleteMap(mapIdToDelete: string) {
  const userUid = store.getState().userInfo.uid;

  if (userUid) {
    const newMapId = await deleteDoc(
      doc(db, "users", userUid, "maps", mapIdToDelete)
    );
  }
}

export async function updateFSImages() {
  const userUid = store.getState().userInfo.uid;
  const selectedMap = store.getState().userInfo.selectedMap;

  if (userUid && selectedMap) {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
      const mapDocSnap = await getDoc(mapDocRef);
      if (mapDocSnap.exists()) {
        const allImages = store.getState().imageUrls.allImages;

        await updateDoc(mapDocRef, {
          images: allImages,
          updatedTime: serverTimestamp()
        });
      }
      return;
    }
    console.error("userDoc not existed");
  }
}

export async function getFSImages() {
  const userUid = store.getState().userInfo.uid;
  const selectedMap = store.getState().userInfo.selectedMap;

  if (userUid && selectedMap) {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const mapDocRef = doc(db, "users", userUid, "maps", selectedMap);
      const mapDocSnap = await getDoc(mapDocRef);
      if (mapDocSnap.exists()) {
        if (mapDocSnap.data().images) {
          store.dispatch(setImageUrls(mapDocSnap.data().images));
        }
      }
      return;
    }
    console.error("userDoc not existed");
  }
}
