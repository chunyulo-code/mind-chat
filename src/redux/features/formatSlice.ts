import { createSlice } from "@reduxjs/toolkit";
import { FormatState, FormatNumber } from "@/app/types/formatSliceTypes";

const initialState: FormatState = {
  value: FormatNumber.MIND_MAP
};

export const dataFormat = createSlice({
  name: "dataFormat",
  initialState,
  reducers: {
    toMindMap: (state) => {
      state.value = FormatNumber.MIND_MAP;
      console.log(`Set format to MIND_MAP mode`);
    },
    toOutline: (state) => {
      state.value = FormatNumber.OUTLINE;
      console.log(`Set format to OUTLINE mode`);
    }
  }
});

export const { toMindMap, toOutline } = dataFormat.actions;
export default dataFormat.reducer;
