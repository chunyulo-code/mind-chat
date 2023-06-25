import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counterSlice";
import gptResponseReducer from "@/redux/features/gptResponseSlice";

export const store = configureStore({
  reducer: { counterReducer, gptResponseReducer }
  // devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
