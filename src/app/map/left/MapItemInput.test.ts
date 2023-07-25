import { updateMapName } from "./MapItemInput";
import { Map } from "@/app/types/userInfoSliceTypes";

// Test Case 1: Update existing map name
test("Update existing map name", () => {
  const allMaps: Map[] = [
    { mapId: "1", mapName: "Map 1" },
    { mapId: "2", mapName: "Map 2" },
    { mapId: "3", mapName: "Map 3" }
  ];

  const mapIdToUpdate = "2";
  const newMapName = "New Map 2";

  const updatedMaps = updateMapName(allMaps, mapIdToUpdate, newMapName);

  //  Verify that the returned array contains the updated name.
  expect(updatedMaps).toEqual([
    { mapId: "1", mapName: "Map 1" },
    { mapId: "2", mapName: "New Map 2" },
    { mapId: "3", mapName: "Map 3" }
  ]);

  // Expect the updated array to be equal to the expected array with the name updated and the original array to remain unchanged.
  expect(allMaps).toEqual([
    { mapId: "1", mapName: "Map 1" },
    { mapId: "2", mapName: "Map 2" },
    { mapId: "3", mapName: "Map 3" }
  ]);
});

// Test Case 2: Update non-existent map name
test("Update non-existent map name", () => {
  const allMaps: Map[] = [
    { mapId: "1", mapName: "Map 1" },
    { mapId: "2", mapName: "Map 2" },
    { mapId: "3", mapName: "Map 3" }
  ];

  const mapIdToUpdate = "4"; // Non-existed Id
  const newMapName = "New Map 4";

  const updatedMaps = updateMapName(allMaps, mapIdToUpdate, newMapName);

  // Verify that when updating the name of a map that does not exist, the array remains unchanged.
  expect(updatedMaps).toEqual(allMaps);

  // Expect the updated array to be equal to the original array and the original array to remain unchanged.
  expect(allMaps).toEqual([
    { mapId: "1", mapName: "Map 1" },
    { mapId: "2", mapName: "Map 2" },
    { mapId: "3", mapName: "Map 3" }
  ]);
});
