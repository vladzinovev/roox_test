import {configureStore} from "@reduxjs/toolkit"

import { useDispatch } from "react-redux";

const store = configureStore({
    reducer:{
        
    },
})
export default store;

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch : () => AppDispatch = useDispatch;