import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Map = { mapId: string; mapName: string };

type UserInfoState = {
  isLogIn: boolean;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  allMaps: Map[];
  selectedMap: string | undefined;
  editableMapId: string | undefined;
};

const initialState: UserInfoState = {
  isLogIn: false,
  uid: null,
  email: null,
  displayName: null,
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
    setUserUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setUserDisplayName: (state, action: PayloadAction<string | null>) => {
      state.displayName = action.payload;
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
  setIsLogIn,
  setUserUid,
  setUserEmail,
  setUserDisplayName,
  setAllMaps,
  setSelectedMap,
  setEditableMapId
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
