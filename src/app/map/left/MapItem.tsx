"use client";

import { memo } from "react";
import { MdDeleteOutline } from "react-icons/md";

import MapItemInput from "./MapItemInput";
import {
  setSelectedMap,
  setEditableMapId
} from "@/redux/features/userInfoSlice";
import {
  setIsDeleteMapClicked,
  setMapIdToDelete
} from "@/redux/features/leftBarSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Map } from "@/app/types/userInfoSliceTypes";

type MapItemProps = { map: Map };

function MapItem({ map }: MapItemProps) {
  const { mapId, mapName } = map;

  const dispatch = useAppDispatch();

  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const editableMapId = useAppSelector((state) => state.userInfo.editableMapId);

  function MapItemText() {
    return (
      <div
        className={`group relative cursor-pointer ${
          editableMapId !== mapId ? "block" : "hidden"
        }`}
        onClick={() => dispatch(setSelectedMap(mapId))}
        onDoubleClick={() => dispatch(setEditableMapId(mapId))}
      >
        <div className="truncate">{mapName}</div>
        <div
          className={`absolute right-0 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-md bg-gray-700 pl-2 text-xl group-hover:block hover:text-mindchat-primary`}
          onClick={() => {
            dispatch(setMapIdToDelete(mapId));
            dispatch(setIsDeleteMapClicked(true));
          }}
        >
          <MdDeleteOutline />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg px-4 py-3 hover:bg-gray-700 ${
        selectedMap === map.mapId ? "bg-gray-700" : "bg-transparent"
      }`}
    >
      <MapItemText />
      <MapItemInput map={map} />
    </div>
  );
}

export default memo(MapItem);
