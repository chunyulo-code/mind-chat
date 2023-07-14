"use client";
import React, { useEffect, useRef } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { db } from "@/app/utils/firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setAllMaps,
  setSelectedMap,
  setEditableMapId
} from "@/redux/features/userInfoSlice";
import { nanoid } from "nanoid";
import { FSAddNewMap, updateFSMapName } from "@/app/utils/firestoreUpdater";
import { auth } from "@/app/utils/firebase";
import { Map } from "@/app/types/userInfoSliceTypes";
import { showQuestionBar } from "@/redux/features/flowSlice";
import { setLeftBarWidth } from "@/redux/features/leftBarSlice";

export default function LeftBar() {
  const dispatch = useAppDispatch();
  const allMaps = useAppSelector((state) => state.userInfo.allMaps);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const editableMapId = useAppSelector((state) => state.userInfo.editableMapId);
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const leftBarRef = useRef(null);

  async function fetchUserMaps() {
    if (userUid) {
      console.log("UserUid exists");
      const querySnapshot = await getDocs(
        collection(db, "users", userUid, "maps")
      );
      let fetchedMaps: Map[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMaps.push({ mapId: doc.id, mapName: doc.data().mapName });
      });
      dispatch(setAllMaps(fetchedMaps));
      return;
    }

    console.log("No userUid");
    dispatch(setAllMaps([]));
  }

  function addNewMap() {
    const newMapName = `New map - ${nanoid()}`;
    const newAllMaps = [{ mapId: newMapName, mapName: newMapName }, ...allMaps];
    dispatch(setAllMaps(newAllMaps));
    FSAddNewMap(newMapName).then((newMapId) => {
      if (newMapId) {
        const mapId = newMapId.id.toString();
        dispatch(setSelectedMap(mapId));
        dispatch(showQuestionBar());
      }
    });
  }

  function updateMapNames(newMapName: string) {
    const newAllMaps = allMaps.map((map) => {
      if (map.mapId === editableMapId) return { ...map, mapName: newMapName };
      else return map;
    });
    console.log(newAllMaps);
    return newAllMaps;
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
          allMaps.map((map) => (
            <div
              key={map.mapId}
              id={map.mapId}
              className={`flex cursor-pointer items-center rounded-lg px-5 py-3 hover:bg-gray-700 ${
                selectedMap === map.mapId ? "bg-gray-700" : "bg-transparent"
              }`}
              onClick={() => {
                dispatch(setSelectedMap(map.mapId));
                if (map.mapId !== editableMapId)
                  dispatch(setEditableMapId(undefined));
              }}
              onDoubleClick={() => dispatch(setEditableMapId(map.mapId))}
            >
              <span
                className={`overflow-hidden truncate ${
                  editableMapId === map.mapId ? "hidden" : "block"
                }`}
              >
                {map.mapName}
              </span>
              <label htmlFor="mapNameEditor" className="hidden">
                Map Name Editor
              </label>
              <input
                className={`w-full rounded-lg border-2 border-gray-500 bg-transparent px-2 py-1 ${
                  editableMapId === map.mapId ? "block" : "hidden"
                }`}
                onChange={(e) => {
                  dispatch(setAllMaps(updateMapNames(e.target.value)));
                  updateFSMapName(map.mapId, e.target.value);
                }}
                value={map.mapName}
                id="mapNameEditor"
                type="text"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
