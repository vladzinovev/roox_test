import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import users from "./users";

const store = configureStore({
  reducer: {
    users
  },
});
export default store;

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;
