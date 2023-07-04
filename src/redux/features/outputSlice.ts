import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GptStatus } from "@/app/types/outputSliceTypes";

type OutputState = {
  output: string;
  gptStatus: string;
};

const initialState = {
  output: "",
  gptStatus: GptStatus.STAND_BY
} as OutputState;

export const output = createSlice({
  name: "output",
  initialState,
  reducers: {
    insertChunkToOutput: (state, action: PayloadAction<string>) => {
      state.output += action.payload;
    },
    emptyOutput: (state) => {
      state.output = "";
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setGptStatus: (state, action) => {
      state.gptStatus = action.payload;
    }
  }
});

export const { insertChunkToOutput, emptyOutput, setOutput, setGptStatus } =
  output.actions;
export default output.reducer;
