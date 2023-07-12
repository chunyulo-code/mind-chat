import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Map = { mapId: string; mapName: string };

type UserInfoState = {
  isLogIn: boolean;
  uid: string | null;
  allMaps: Map[];
  selectedMap: string | undefined;
  editableMapId: string | undefined;
};

const initialState: UserInfoState = {
  isLogIn: false,
  uid: null,
  allMaps: [],
  selectedMap: undefined,
  editableMapId: undefined
};

export const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    setIsLogIn: (state, action: PayloadAction<boolean>) => {
      state.isLogIn = action.payload;
    },
    setCurrentUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
    },
    setAllMaps: (state, action: PayloadAction<Map[]>) => {
      state.allMaps = action.payload;
    },
    setSelectedMap: (state, action: PayloadAction<string>) => {
      state.selectedMap = action.payload;
    },
    setEditableMapId: (state, action: PayloadAction<string | undefined>) => {
      state.editableMapId = action.payload;
    }
  }
});

export const {
  setCurrentUid,
  setIsLogIn,
  setAllMaps,
  setSelectedMap,
  setEditableMapId
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
