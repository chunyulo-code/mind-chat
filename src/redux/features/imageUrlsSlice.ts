import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserMode, UserModeState } from "@/app/types/userModeSliceTypes";

type ImageUrls = {
  value: string[];
};

const initialState: ImageUrls = {
  value: []
};

export const imageUrlsSlice = createSlice({
  name: "imagesUrlsSlice",
  initialState,
  reducers: {
    addImageUrls: (state, action: PayloadAction<string[]>) => {
      state.value = state.value.concat(action.payload);
    }
  }
});

export const { addImageUrls } = imageUrlsSlice.actions;
export default imageUrlsSlice.reducer;
