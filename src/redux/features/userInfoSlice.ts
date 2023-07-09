import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserInfoState = {
  isLogIn: boolean;
  uid: string | null;
  allMaps: string[];
  selectedMap: string;
};

const initialState: UserInfoState = {
  isLogIn: false,
  uid: null,
  allMaps: [],
  selectedMap: "map3"
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
    setAllMaps: (state, action: PayloadAction<string[]>) => {
      state.allMaps = action.payload;
    },
    setSelectedMap: (state, action: PayloadAction<string>) => {
      state.selectedMap = action.payload;
    }
  }
});

export const { setCurrentUid, setIsLogIn, setAllMaps, setSelectedMap } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
