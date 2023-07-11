"use client";
import React, { useEffect } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { db } from "@/app/utils/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAllMaps, setSelectedMap } from "@/redux/features/userInfoSlice";
import { nanoid } from "nanoid";
import { FSAddNewMap } from "@/app/utils/firestoreUpdater";
import { auth } from "@/app/utils/firebase";

export default function LeftBar() {
  const dispatch = useAppDispatch();
  const allMaps = useAppSelector((state) => state.userInfo.allMaps);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);

  useEffect(() => {
    async function fetchUserMaps() {
      const userUid = auth.currentUser?.uid;
      if (userUid) {
        const querySnapshot = await getDocs(
          collection(db, "users", userUid, "maps")
        );
        let fetchedMaps: string[] = [];
        querySnapshot.forEach((doc) => {
          fetchedMaps.push(doc.id);
        });
        dispatch(setAllMaps(fetchedMaps));
      }
    }

    fetchUserMaps();
  }, []);

  function addNewMap() {
    const newMapName = `map-${nanoid()}`;
    const newAllMaps = [newMapName, ...allMaps];
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
      <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
        {allMaps.length > 0 &&
          allMaps.map((mapName) => (
            <div
              key={mapName}
              className={`flex cursor-pointer items-center rounded-lg px-5 py-3 hover:bg-gray-700 ${
                selectedMap === mapName ? "bg-gray-700" : "bg-transparent"
              }`}
              onClick={() => dispatch(setSelectedMap(mapName))}
            >
              <span className="overflow-hidden truncate">{mapName}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
