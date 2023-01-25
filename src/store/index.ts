import { configureStore } from "@reduxjs/toolkit";
import sort from "./sort";
import users from "./users";

const store = configureStore({
  reducer: {
    users,
    sort
  },
});
export default store;

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export const useAppDispatch = () => useDispatch<AppDispatch>();
