import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LibraryState = {
  value: string[];
};

const initialState = {
  value: []
} as LibraryState;

export const library = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToLibrary: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    }
  }
});

export const { addToLibrary } = library.actions;
export default library.reducer;
