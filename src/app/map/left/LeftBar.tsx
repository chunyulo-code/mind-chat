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
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const allMaps = useAppSelector((state) => state.userInfo.allMaps);

  const leftBarRef = useRef(null);

  useEffect(() => {
    async function fetchUserAllMaps(userUid: string) {
      try {
        if (userUid) {
          const querySnapshot = await fetchMapsFromFirestore(userUid);
          const fetchedMaps: Map[] = [];

          querySnapshot.forEach((doc) => {
            fetchedMaps.push({ mapId: doc.id, mapName: doc.data().mapName });
          });

          const reversedMaps = fetchedMaps.reverse();
          dispatch(setAllMaps(reversedMaps));
          dispatch(setSelectedMap(reversedMaps[0].mapId));
        } else {
          dispatch(setAllMaps([]));
        }
      } catch (error) {
        console.error("Error fetching maps:", error);
      }
    }

    if (userUid) {
      fetchUserAllMaps(userUid);

      const unsub = onSnapshot(collection(db, "users", userUid, "maps"), () => {
        fetchUserAllMaps(userUid);
      });

      return () => unsub();
    }
  }, [userUid, dispatch]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const leftBarEntry = entries[0];
      const { x, width } = leftBarEntry.contentRect;
      const leftBarPadding = x * 2;
      dispatch(setLeftBarWidth(width + leftBarPadding));
    });

    if (leftBarRef.current) {
      observer.observe(leftBarRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [dispatch]);

  function fetchMapsFromFirestore(userUid: string) {
    const mapsRef = collection(db, "users", userUid, "maps");
    return getDocs(query(mapsRef, orderBy("updatedTime")));
  }

  function addNewMap() {
    FSAddNewMap().then((newMapId) => {
      if (newMapId) {
        const newAllMaps = [
          { mapId: newMapId, mapName: "New map" },
          ...allMaps
        ];
        dispatch(setAllMaps(newAllMaps));
        dispatch(setSelectedMap(newMapId));
        dispatch(showQuestionBar());
      }
    });
  }

  function AddNewMap() {
    return (
      <div
        className="flex cursor-pointer items-center rounded-lg px-4 py-3 hover:bg-gray-700"
        onClick={() => addNewMap()}
      >
        <MdOutlineAdd />
        <span className="ml-3">New map</span>
      </div>
    );
  }

  function DividingLine() {
    return <div className="h-[2px] w-full bg-gray-700"></div>;
  }

  function AllMaps() {
    return (
      <div className="flex flex-col gap-2 overflow-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
        {allMaps.length > 0 &&
          allMaps.map((map) => (
            <MapItem key={`MapItem_${map.mapId}`} map={map} />
          ))}
      </div>
    );
  }

  return (
    <div
      className="flex h-full flex-col gap-3 bg-mindchat-bg-dark p-4 text-white"
      ref={leftBarRef}
    >
      <AddNewMap />
      <DividingLine />
      <AllMaps />
    </div>
  );
}
