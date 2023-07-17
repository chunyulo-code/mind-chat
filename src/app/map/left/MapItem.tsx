import { useRef } from "react";
import useHover from "@/app/hooks/useHover";
import { MdDeleteOutline } from "react-icons/md";
import { Map } from "@/app/types/userInfoSliceTypes";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  setSelectedMap,
  setEditableMapId
} from "@/redux/features/userInfoSlice";
import { setAllMaps } from "@/redux/features/userInfoSlice";
import { updateFSMapName, FSDeleteMap } from "@/app/utils/firestoreUpdater";

type MapItemProps = { map: Map };

export default function MapItem({ map }: MapItemProps) {
  const dispatch = useAppDispatch();
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const editableMapId = useAppSelector((state) => state.userInfo.editableMapId);
  const allMaps = useAppSelector((state) => state.userInfo.allMaps);
  const [mapItemRef, isHovered] = useHover();
  const inputRef = useRef<HTMLInputElement>(null);

  function updateMapNames(newMapName: string) {
    const newAllMaps = allMaps.map((map) => {
      if (map.mapId === editableMapId) return { ...map, mapName: newMapName };
      else return map;
    });
    console.log(newAllMaps);
    return newAllMaps;
  }

  function deleteMap(mapIdToDelete: string) {
    const newAllMaps = allMaps.filter((map) => map.mapId !== mapIdToDelete);
    dispatch(setAllMaps(newAllMaps));
    FSDeleteMap(mapIdToDelete);
  }

  function blurInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (inputRef.current) {
        inputRef.current.blur();
        dispatch(setEditableMapId(undefined));
      }
    }
  }

  return (
    <div
      id={map.mapId}
      ref={mapItemRef}
      className={`relative flex cursor-pointer items-center rounded-lg px-5 py-3 hover:bg-gray-700 ${
        selectedMap === map.mapId ? "bg-gray-700" : "bg-transparent"
      }`}
      onClick={() => {
        dispatch(setSelectedMap(map.mapId));
        if (map.mapId !== editableMapId) dispatch(setEditableMapId(undefined));
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
      <span
        className={`absolute right-5 rounded-md bg-gray-700 p-2 text-xl hover:text-mindchat-primary ${
          isHovered && editableMapId !== map.mapId ? "block" : "hidden"
        }`}
        onClick={() => deleteMap(map.mapId)}
      >
        <MdDeleteOutline />
      </span>
      <label htmlFor="mapNameEditor" className="hidden">
        Map Name Editor
      </label>
      <input
        id="mapNameEditor"
        type="text"
        value={map.mapName}
        ref={inputRef}
        className={`w-full rounded-lg border border-gray-500 bg-transparent px-2 py-1 ${
          editableMapId === map.mapId ? "block" : "hidden"
        }`}
        onChange={(e) => {
          dispatch(setAllMaps(updateMapNames(e.target.value)));
          updateFSMapName(map.mapId, e.target.value);
        }}
        onKeyDown={blurInput}
      />
    </div>
  );
}
