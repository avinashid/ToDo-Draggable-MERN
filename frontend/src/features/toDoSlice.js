import { createSlice } from "@reduxjs/toolkit";
import { fetchToDo } from "./middleware/toDoMiddleware";

const initialState = {
  isLoading: true,
  toDo: [],
};

export const toDoSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reOrderList: (state, action) => {
      state.toDo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToDo.fulfilled, (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.toDo = action.payload.toDo;
    });
  },
});
export const { reOrderList } = toDoSlice.actions;

export default toDoSlice.reducer;
