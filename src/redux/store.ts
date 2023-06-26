import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counterSlice";
import gptResponseReducer from "@/redux/features/gptResponseSlice";
import dataFotmatReducer from "@/redux/features/formatSlice";

export const store = configureStore({
  reducer: { counterReducer, gptResponseReducer, dataFotmatReducer }
  // devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
