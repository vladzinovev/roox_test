import { createSlice } from "@reduxjs/toolkit";

interface SortState {
  sort: "alphabet" | "city" | "company";
  arrowCity: boolean;
  arrowCompany: boolean;
}

const sort = createSlice({
  name: "sort",
  initialState: {
    sort: "alphabet",
    arrowCity: false,
    arrowCompany: false,
  } as SortState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setArrowCity: (state, action) => {
      state.arrowCity = action.payload;
    },
    setArrowCompany: (state, action) => {
      state.arrowCompany = action.payload;
    },
  },
});

export default sort.reducer;
export const { setSort, setArrowCity,setArrowCompany } = sort.actions;
