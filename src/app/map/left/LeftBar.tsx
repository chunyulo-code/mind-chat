"use client";
import React, { useEffect, useRef } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { db } from "@/app/utils/firebase";
import {
  getDocs,
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAllMaps, setSelectedMap } from "@/redux/features/userInfoSlice";
import { FSAddNewMap } from "@/app/utils/firestoreUpdater";
import { Map } from "@/app/types/userInfoSliceTypes";
import { showQuestionBar } from "@/redux/features/flowSlice";
import { setLeftBarWidth } from "@/redux/features/leftBarSlice";
import MapItem from "./MapItem";

export default function LeftBar() {
  const dispatch = useAppDispatch();
  const allMaps = useAppSelector((state) => state.userInfo.allMaps);
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const leftBarRef = useRef(null);

  async function fetchUserMaps() {
    if (userUid) {
      console.log("UserUid exists");
      const mapsRef = collection(db, "users", userUid, "maps");
      const querySnapshot = await getDocs(
        query(mapsRef, orderBy("updatedTime"))
      );
      let fetchedMaps: Map[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMaps.push({ mapId: doc.id, mapName: doc.data().mapName });
      });
      dispatch(setAllMaps(fetchedMaps.reverse()));
      return;
    }

    console.log("No userUid");
    dispatch(setAllMaps([]));
  }

  function addNewMap() {
    FSAddNewMap().then((newMapId) => {
      if (newMapId) {
        const stringifiedNewMapId = newMapId.toString();
        const newAllMaps = [
          { mapId: stringifiedNewMapId, mapName: "New map" },
          ...allMaps
        ];
        dispatch(setAllMaps(newAllMaps));
        dispatch(setSelectedMap(stringifiedNewMapId));
        dispatch(showQuestionBar());
      }
    });
  }

  useEffect(() => {
    console.log("Ready to fetch");
    fetchUserMaps();

    if (userUid) {
      const unsub = onSnapshot(collection(db, "users", userUid, "maps"), () => {
        fetchUserMaps();
      });
      return () => unsub();
    }
  }, [userUid]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        dispatch(setLeftBarWidth(width));
      }
    });

    if (leftBarRef.current) {
      observer.observe(leftBarRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="flex h-full flex-col gap-3 bg-mindchat-bg-dark p-4 text-white"
      ref={leftBarRef}
    >
      <div
        className="flex cursor-pointer items-center rounded-lg px-4 py-3 hover:bg-gray-700"
        onClick={() => addNewMap()}
      >
        <MdOutlineAdd />
        <span className="ml-3">New map</span>
      </div>
      <div className="h-[2px] w-full bg-gray-700"></div>
      <div className="flex flex-col gap-2 overflow-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
        {allMaps.length > 0 &&
          allMaps.map((map) => <MapItem key={map.mapId} map={map} />)}
      </div>
    </div>
  );
}
