import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LeftBarState = {
  width: number;
  isDeleteMapClicked: boolean;
  mapIdToDelete: string | null;
};

const initialState: LeftBarState = {
  width: 180,
  isDeleteMapClicked: false,
  mapIdToDelete: null
};

export const leftBar = createSlice({
  name: "leftBar",
  initialState,
  reducers: {
    setLeftBarWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setIsDeleteMapClicked: (state, action: PayloadAction<boolean>) => {
      state.isDeleteMapClicked = action.payload;
    },
    setMapIdToDelete: (state, action: PayloadAction<string | null>) => {
      state.mapIdToDelete = action.payload;
    }
  }
});

export const { setLeftBarWidth, setIsDeleteMapClicked, setMapIdToDelete } =
  leftBar.actions;
export default leftBar.reducer;
