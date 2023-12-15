import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../Components/HomeSlice";

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export default store;
