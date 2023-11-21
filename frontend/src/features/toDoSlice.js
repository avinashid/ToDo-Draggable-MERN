import { createSlice } from "@reduxjs/toolkit";
import { fetchToDo } from "./middleware/toDoMiddleware";

const initialState = {
  isLoading: true,
  toDo: [],
};

export const toDoSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToDo.fulfilled, (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.toDo = action.payload.toDo;
    });
  },
});

export default toDoSlice.reducer;
