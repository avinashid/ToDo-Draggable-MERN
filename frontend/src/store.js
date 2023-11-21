import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import toDoSlice from "./features/toDoSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    toDo: toDoSlice,
  },
});
export default store;
