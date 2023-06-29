import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GptStatus } from "@/app/types/gptResponseSliceTypes";

type GptResponseState = {
  allResponse: string;
  incomingText: string;
  gptStatus: number;
  shouldGenerateNode: boolean;
};

const initialState: GptResponseState = {
  allResponse: "",
  incomingText: "",
  gptStatus: GptStatus.STAND_BY,
  shouldGenerateNode: false
};

export const gptResponse = createSlice({
  name: "gptResponse",
  initialState,
  reducers: {
    setGptResponse: (state, action: PayloadAction<string>) => {
      state.allResponse += action.payload;
    },
    setGptIncomingText: (state, action: PayloadAction<string>) => {
      state.incomingText = action.payload;
    },
    setGptStatus: (state, action: PayloadAction<number>) => {
      state.gptStatus = action.payload;
    },
    setShouldGenerateNode: (state, action: PayloadAction<boolean>) => {
      state.shouldGenerateNode = action.payload;
    }
  }
});

export const {
  setGptResponse,
  setGptIncomingText,
  setGptStatus,
  setShouldGenerateNode
} = gptResponse.actions;
export default gptResponse.reducer;
