import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsDeleteMapClicked,
  setMapIdToDelete
} from "@/redux/features/leftBarSlice";
import { setAllMaps, setSelectedMap } from "@/redux/features/userInfoSlice";
import { FSDeleteMap } from "../utils/firestoreUpdater";

export default function DeleteMapModal() {
  const dispatch = useAppDispatch();
  const allMaps = useAppSelector((state) => state.userInfo.allMaps);
  const mapIdToDelete = useAppSelector((state) => state.leftBar.mapIdToDelete);

  function deleteMap(mapIdToDelete: string) {
    const newAllMaps = allMaps.filter((map) => map.mapId !== mapIdToDelete);
    dispatch(setAllMaps(newAllMaps));
    dispatch(setSelectedMap(newAllMaps[0].mapId));
    FSDeleteMap(mapIdToDelete);
    dispatch(setMapIdToDelete(null));
    dispatch(setIsDeleteMapClicked(false));
  }

  return (
    <div className="absolute z-[100] h-screen w-screen">
      <div className="h-full w-full bg-gray-700 opacity-80"></div>
      <div className="absolute top-0 flex h-screen w-screen items-center justify-center">
        <div className="p flex h-[300px] w-[300px] flex-col items-center justify-center gap-6 rounded-2xl bg-mindchat-bg-dark-darker px-8 pt-5 text-center text-white shadow-lg shadow-gray-800">
          <div className="text-5xl text-mindchat-primary">
            <BsFillTrash3Fill />
          </div>
          <div className="text-2xl font-bold">Delete Map</div>
          <div className="text-sm text-gray-300">
            Are you sure you want to delete this card ?
          </div>
          <div className="mt-2 flex gap-5 font-medium">
            <button
              className="rounded-md bg-mindchat-primary px-8 py-2 text-mindchat-bg-dark hover:bg-red-500 hover:text-white"
              onClick={() => {
                if (mapIdToDelete) deleteMap(mapIdToDelete);
              }}
            >
              Delete
            </button>
            <button
              className="rounded-md border border-transparent px-8 py-2 text-white hover:border-mindchat-primary hover:text-mindchat-primary"
              onClick={() => dispatch(setIsDeleteMapClicked(false))}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
