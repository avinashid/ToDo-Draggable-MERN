import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchToDo } from "./middleware/toDoMiddleware";
import { updateToDo } from "./middleware/toDoMiddleware";
const initialState = {
  isLoading: true,
  toDo: [],
};

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    reOrderList: (state, action) => {
      state.toDo = action.payload;
      updateToDo(action.payload);
    },
    markToDo: (state, action) => {
      state.isLoading = true;
      const todo = state.toDo.map((e) => {
        if (action.payload === e._id) return { ...e, markToDo: !e.markToDo };
        return { ...e };
      });
      state.toDo = todo;
      updateToDo(todo);
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToDo.fulfilled, (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.toDo = action.payload.toDo;
    });
  },
});
export const { reOrderList, markToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
