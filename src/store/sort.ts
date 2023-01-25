import { createSlice } from "@reduxjs/toolkit";

interface SortState {
  sort: "alphabet" | "city" | "company";
}

const sort = createSlice({
  name: "sort",
  initialState: {
    sort: "alphabet",
  } as SortState,
  reducers: {
    setSort: (state: SortState, action) => {
      state.sort = action.payload;
    },
  },
});

export default sort.reducer;
export const { setSort } = sort.actions;
