import { createSlice } from "@reduxjs/toolkit";
import {
  DisplayFormatState,
  DisplayFormatNumber
} from "@/app/types/displayFormatSliceTypes";

const initialState: DisplayFormatState = {
  value: DisplayFormatNumber.MIND_MAP
};

export const displayFormat = createSlice({
  name: "displayFormat",
  initialState,
  reducers: {
    toMindMap: (state) => {
      state.value = DisplayFormatNumber.MIND_MAP;
      console.log(`Set format to MIND_MAP mode`);
    },
    toOutline: (state) => {
      state.value = DisplayFormatNumber.OUTLINE;
      console.log(`Set format to OUTLINE mode`);
    }
  }
});

export const { toMindMap, toOutline } = displayFormat.actions;
export default displayFormat.reducer;
