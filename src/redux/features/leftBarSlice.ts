import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type leftBarState = {
  width: number;
};

const initialState = {
  width: 180
};

export const leftBar = createSlice({
  name: "leftBar",
  initialState,
  reducers: {
    setLeftBarWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    }
  }
});

export const { setLeftBarWidth } = leftBar.actions;
export default leftBar.reducer;
