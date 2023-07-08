import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserInfoState = {
  isLogIn: boolean;
  uid: string | null;
  selectedMap: string;
};

const initialState: UserInfoState = {
  isLogIn: false,
  uid: null,
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
    setSelectedMap: (state, action: PayloadAction<string>) => {
      state.selectedMap = action.payload;
    }
  }
});

export const { setCurrentUid, setIsLogIn, setSelectedMap } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
