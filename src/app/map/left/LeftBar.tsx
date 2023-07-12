"use client";
import React, { useEffect } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { db } from "@/app/utils/firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAllMaps, setSelectedMap } from "@/redux/features/userInfoSlice";
import { nanoid } from "nanoid";
import { FSAddNewMap } from "@/app/utils/firestoreUpdater";
import { auth } from "@/app/utils/firebase";
import { Map } from "@/app/types/userInfoSliceTypes";

export default function LeftBar() {
  const dispatch = useAppDispatch();
  const allMaps = useAppSelector((state) => state.userInfo.allMaps);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const userUid = auth.currentUser?.uid;

  async function fetchUserMaps() {
    if (userUid) {
      const querySnapshot = await getDocs(
        collection(db, "users", userUid, "maps")
      );
      let fetchedMaps: Map[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMaps.push({ mapId: doc.id, mapName: doc.data().mapName });
      });
      dispatch(setAllMaps(fetchedMaps));
    }
  }

  useEffect(() => {
    fetchUserMaps();
  }, []);

  useEffect(() => {
    if (userUid) {
      const unsub = onSnapshot(collection(db, "users", userUid, "maps"), () => {
        fetchUserMaps();
      });
      return () => unsub();
    }
  }, []);

  function addNewMap() {
    const newMapName = `map-${nanoid()}`;
    const newAllMaps = [{ mapId: newMapName, mapName: newMapName }, ...allMaps];
    dispatch(setAllMaps(newAllMaps));
    FSAddNewMap(newMapName);
  }

  return (
    <div className=" flex h-full flex-col gap-3 bg-mindchat-bg-dark p-4 text-white">
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
              onClick={() => dispatch(setSelectedMap(map.mapId))}
              onDoubleClick={(e) => e.target}
            >
              <span className="overflow-hidden truncate">{map.mapName}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
