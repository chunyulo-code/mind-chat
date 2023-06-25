import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type gptResponseState = {
  value: string;
};

const initialState = {
  value: ""
} as gptResponseState;

export const gptResponse = createSlice({
  name: "gptResponse",
  initialState,
  reducers: {
    setGptResponse: (state, action: PayloadAction<string>) => {
      console.log("works!!!");
      state.value += action.payload;
    }
  }
});

export const { setGptResponse } = gptResponse.actions;
export default gptResponse.reducer;
