import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    userData: [],
    searchValue: "",
  },
  reducers: {
    updateData: (state, action) => {
      state.userData = action.payload;
    },
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { updateData, updateSearchValue } = homeSlice.actions;
export const usersData = (state) => state.home.userData;
export const searchValue = (state) => state.home.searchValue;

export default homeSlice.reducer;
