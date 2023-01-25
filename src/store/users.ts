import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPost } from "../types/types";

interface UsersState {
  status: "empty" | "loading" | "error" | "success";
  error: {};
  post: IPost[];
}

export const getAllPosts = createAsyncThunk(
  "users/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios("https://jsonplaceholder.typicode.com/users");

      if (res.status !== 200) {
        throw new Error("Server error!");
      }
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: {
    status: "empty",
    error: {},
    post: [],
  } as UsersState,
  reducers: {
    getSortUsers:(state,{ payload })=>{
        state.post = payload;
    },
    
  },
  extraReducers: (builder) => {
    //pending-ожидание
    builder.addCase(getAllPosts.pending, (state, { payload }) => {
      state.status = "loading";
    });
    //rejected-ошибка
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.status = "error";
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    //fulfilled-отработало корректно
    builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.post = payload;
    });
  },
});

export default users.reducer;
export const { getSortUsers } = users.actions;
