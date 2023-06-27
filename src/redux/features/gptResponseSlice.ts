import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GptResponseState = {
  allResponse: string;
  incomingText: string;
  tempResponse: string;
  isResponseDone: boolean;
  shouldGenerateNode: boolean;
};

const initialState: GptResponseState = {
  allResponse: "",
  incomingText: "",
  tempResponse: "",
  isResponseDone: true,
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
    setTempResponse: (state, action: PayloadAction<string>) => {
      state.tempResponse += action.payload;
    },
    emptyTempResponse: (state) => {
      state.tempResponse = "";
    },
    setIsResponseDone: (state, action: PayloadAction<boolean>) => {
      state.isResponseDone = action.payload;
    },
    setShouldGenerateNode: (state, action: PayloadAction<boolean>) => {
      state.shouldGenerateNode = action.payload;
    },
    resetAndAddWord: (state, action: PayloadAction<string>) => {
      state.tempResponse = action.payload;
    }
  }
});

export const {
  setGptResponse,
  setGptIncomingText,
  setTempResponse,
  emptyTempResponse,
  setIsResponseDone,
  setShouldGenerateNode,
  resetAndAddWord
} = gptResponse.actions;
export default gptResponse.reducer;
