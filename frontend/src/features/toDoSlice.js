import { createSlice } from "@reduxjs/toolkit";
import { fetchToDo } from "./middleware/toDoMiddleware";
import Cookies from "js-cookie";
import { updateToDo } from "./middleware/toDoMiddleware";
const initialState = {
  isLoading: true,
  toDo: [],
};

const offline = !Cookies.get("toDoUserToken") ? true : false;

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    reOrderList: (state, action) => {
      state.toDo = action.payload;
      offline
        ? Cookies.set("toDoUserData", JSON.stringify(action.payload))
        : updateToDo(action.payload);
    },
    markToDo: (state, action) => {
      state.isLoading = true;
      const todo = state.toDo.map((e) => {
        if (action.payload === e._id) return { ...e, markToDo: !e.markToDo };
        return { ...e };
      });
      state.toDo = todo;
      offline
        ? Cookies.set("toDoUserData", JSON.stringify(todo))
        : updateToDo(todo);
      state.isLoading = false;
    },
    deleteToDo: (state, action) => {
      state.isLoading = true;
      const todo = state.toDo.filter((e) => e._id !== action.payload);
      state.toDo = todo;
      offline
        ? Cookies.set("toDoUserData", JSON.stringify(todo))
        : updateToDo(todo);
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
export const { reOrderList, markToDo, deleteToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
