import { configureStore } from "@reduxjs/toolkit";
import gptResponseReducer from "@/redux/features/gptResponseSlice";
import dataFotmatReducer from "@/redux/features/displayFormatSlice";
import userModeReducer from "@/redux/features/userModeSlice";
import imageUrlsReducer from "@/redux/features/imageUrlsSlice";
import flowReducer from "@/redux/features/flowSlice";
import libraryReducer from "@/redux/features/librarySlice";
import outputReducer from "@/redux/features/outputSlice";
import userInfoReducer from "@/redux/features/userInfoSlice";
import leftBarReducer from "@/redux/features/leftBarSlice";
import canvasReducer from "@/redux/features/canvasSlice";

export const store = configureStore({
  reducer: {
    gptResponse: gptResponseReducer,
    dataFormat: dataFotmatReducer,
    userMode: userModeReducer,
    imageUrls: imageUrlsReducer,
    flow: flowReducer,
    library: libraryReducer,
    output: outputReducer,
    userInfo: userInfoReducer,
    leftBar: leftBarReducer,
    canvas: canvasReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
