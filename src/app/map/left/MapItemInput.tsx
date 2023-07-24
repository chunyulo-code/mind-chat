import { useRef, memo } from "react";

import useMapName from "@/app/hooks/useMapName";
import { setAllMaps, setEditableMapId } from "@/redux/features/userInfoSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateFSMapName } from "@/app/utils/firestoreUpdater";
import { Map } from "@/app/types/userInfoSliceTypes";

type MapItemInputProps = { map: Map };

function MapItemInput({ map }: MapItemInputProps) {
  const { mapId, mapName } = map;

  const [newMapName, setNewMapName] = useMapName(mapName);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const allMaps = useAppSelector((state) => state.userInfo.allMaps);
  const editableMapId = useAppSelector((state) => state.userInfo.editableMapId);

  const dispatch = useAppDispatch();

  function updateMapName(mapIdToUpdate: string, newMapName: string) {
    const newAllMaps = allMaps.map((map) => {
      if (map.mapId === mapIdToUpdate) return { ...map, mapName: newMapName };
      else return map;
    });

    dispatch(setAllMaps(newAllMaps));
  }

  function onBlurHandler(mapIdToUpdate: string, newName: string) {
    updateMapName(mapIdToUpdate, newName);
    updateFSMapName(mapIdToUpdate, newName);
  }

  function enterPressedHandler(
    key: string,
    mapIdToUpdate: string,
    newName: string
  ) {
    if (key === "Enter" && inputRef.current) {
      updateMapName(mapIdToUpdate, newName);
      updateFSMapName(mapIdToUpdate, newName);
      dispatch(setEditableMapId(undefined));
      inputRef.current.blur();
    }
  }

  return (
    <div className={editableMapId === mapId ? "block" : "hidden"}>
      <label htmlFor={`mapNameEditor_${mapId}`} className="hidden">
        Edit Map Name
      </label>
      <input
        type="text"
        name={`mapNameEditor_${mapId}`}
        id={`mapNameEditor_${mapId}`}
        ref={inputRef}
        className={`w-full rounded-xl border border-gray-500 bg-transparent px-2 py-1`}
        value={newMapName}
        onChange={(e) => setNewMapName(e.target.value)}
        onBlur={() => onBlurHandler(mapId, newMapName)}
        onKeyDown={(e) => enterPressedHandler(e.key, mapId, newMapName)}
      />
    </div>
  );
}

export default memo(MapItemInput);
