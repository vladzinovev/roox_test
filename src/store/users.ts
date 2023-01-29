import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPost } from "../types/types";

interface UsersState {
  status: "empty" | "loading" | "error" | "success";
  error: {};
  id: number;
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
    } catch (err:any) {
      return rejectWithValue(err.message);
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: {
    status: "empty",
    id: 0,
    error: {},
    post: [],
  } as UsersState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    getEditProfile: (state, action) => {
      state.post.forEach((arr: IPost) => {
        if (arr.id === state.id) {
          arr["name"] = action.payload.name;
          arr["username"] = action.payload.username;
          arr["email"] = action.payload.email;
          arr["address"]["street"] = action.payload.street;
          arr["address"]["city"] = action.payload.city;
          arr["address"]["zipcode"] = action.payload.zipcode;
          arr["phone"] = action.payload.phone;
          arr["website"] = action.payload.website;
          arr["comment"] = action.payload.comment;
        }
      });
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
export const { setId, getEditProfile } = users.actions;
