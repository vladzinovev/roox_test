import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

interface UsersState {
  sort: boolean;
  status: "empty" | "loading" | "error" | "success";
  error: {};
  post: [];
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
    sort: true,
    status: "empty",
    error: {},
    post: [],
  } as UsersState,
  reducers: {
    changeSort: (state, action) => {
      state.sort = !state.sort;
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
export const { changeSort } = users.actions;
