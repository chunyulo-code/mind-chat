import { useState, Dispatch, SetStateAction } from "react";

export default function useMapName(
  defaultMapName: string
): [string, Dispatch<SetStateAction<string>>] {
  const [newMapName, setNewMapName] = useState(defaultMapName);

  return [newMapName, setNewMapName];
}
