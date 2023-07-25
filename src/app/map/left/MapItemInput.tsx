import { useRef, memo } from "react";

import useMapName from "@/app/hooks/useMapName";
import { setAllMaps, setEditableMapId } from "@/redux/features/userInfoSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateFSMapName } from "@/app/utils/firestoreUpdater";
import { Map } from "@/app/types/userInfoSliceTypes";

type MapItemInputProps = { map: Map };

export function updateMapName(
  allMaps: Map[],
  mapIdToUpdate: string,
  newName: string
) {
  const newAllMaps = allMaps.map((map) => {
    if (map.mapId === mapIdToUpdate) return { ...map, mapName: newName };
    else return map;
  });

  return newAllMaps;
}

function MapItemInput({ map }: MapItemInputProps) {
  const { mapId, mapName } = map;

  const [newMapName, setNewMapName] = useMapName(mapName);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const allMaps = useAppSelector((state) => state.userInfo.allMaps);
  const editableMapId = useAppSelector((state) => state.userInfo.editableMapId);

  const dispatch = useAppDispatch();

  function onBlurHandler(
    allMaps: Map[],
    mapIdToUpdate: string,
    newName: string
  ) {
    dispatch(setAllMaps(updateMapName(allMaps, mapIdToUpdate, newName)));
    updateFSMapName(mapIdToUpdate, newName);
  }

  function enterPressedHandler(
    key: string,
    allMaps: Map[],
    mapIdToUpdate: string,
    newName: string
  ) {
    if (key === "Enter" && inputRef.current) {
      dispatch(setAllMaps(updateMapName(allMaps, mapIdToUpdate, newName)));
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
        onBlur={() => onBlurHandler(allMaps, mapId, newMapName)}
        onKeyDown={(e) =>
          enterPressedHandler(e.key, allMaps, mapId, newMapName)
        }
      />
    </div>
  );
}

export default memo(MapItemInput);
