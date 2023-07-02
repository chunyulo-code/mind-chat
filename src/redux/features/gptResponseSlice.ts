import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";

type GptResponseState = {
  allResponse: string;
  gptStatus: number;
};

const initialState: GptResponseState = {
  allResponse: "",
  gptStatus: GptStatus.STAND_BY
};

export const gptResponse = createSlice({
  name: "gptResponse",
  initialState,
  reducers: {
    clearGptResponse: (state) => {
      state.allResponse = "";
    },
    insertChunkToGptResponse: (state, action: PayloadAction<string>) => {
      state.allResponse += action.payload;
    },
    setGptStatus: (state, action: PayloadAction<number>) => {
      state.gptStatus = action.payload;
    }
  }
});

export const { clearGptResponse, insertChunkToGptResponse, setGptStatus } =
  gptResponse.actions;
export default gptResponse.reducer;
