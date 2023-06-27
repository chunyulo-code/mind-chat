import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counterSlice";
import gptResponseReducer from "@/redux/features/gptResponseSlice";
import dataFotmatReducer from "@/redux/features/displayFormatSlice";
import userModeReducer from "@/redux/features/userModeSlice";
import imageUrlsReducer from "@/redux/features/imageUrlsSlice";

export const store = configureStore({
  reducer: {
    counterReducer,
    gptResponseReducer,
    dataFotmatReducer,
    userModeReducer,
    imageUrlsReducer
  }
  // devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
