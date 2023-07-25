import { createSlice } from "@reduxjs/toolkit";
import { UserMode, UserModeState } from "@/app/types/userModeSliceTypes";

const initialState: UserModeState = {
  value: UserMode.MIND_MAP
};

export const userMode = createSlice({
  name: "userMode",
  initialState,
  reducers: {
    toMindMapMode: (state) => {
      state.value = UserMode.MIND_MAP;
    },
    toDrawingMode: (state) => {
      state.value = UserMode.DRAWING;
    }
  }
});

export const { toMindMapMode, toDrawingMode } = userMode.actions;
export default userMode.reducer;
