import { createSlice } from "@reduxjs/toolkit";

type CanvasState = {
  color: string;
};

const MINDCHAT_PRIMARY_COLOR = "#42f0ed";
const initialState: CanvasState = {
  color: MINDCHAT_PRIMARY_COLOR
};

export const canvas = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    }
  }
});

export const { setColor } = canvas.actions;
export default canvas.reducer;
