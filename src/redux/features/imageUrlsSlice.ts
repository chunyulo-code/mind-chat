import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserMode, UserModeState } from "@/app/types/userModeSliceTypes";

type ImageUrls = {
  allImages: string[];
  selectedImage: string | null;
};

const initialState: ImageUrls = {
  allImages: [],
  selectedImage: null
};

export const imageUrlsSlice = createSlice({
  name: "imagesUrlsSlice",
  initialState,
  reducers: {
    addImageUrls: (state, action: PayloadAction<string[]>) => {
      state.allImages = state.allImages.concat(action.payload);
    },
    setImageUrls: (state, action: PayloadAction<string[]>) => {
      state.allImages = action.payload;
    },
    setSelectedImage: (state, action: PayloadAction<string | null>) => {
      state.selectedImage = action.payload;
    }
  }
});

export const { addImageUrls, setImageUrls, setSelectedImage } =
  imageUrlsSlice.actions;
export default imageUrlsSlice.reducer;
