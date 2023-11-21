import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./middleware/userMiddleware";

const initialState = {
  name: "",
  username: "",
  token: "notoken",
  _id: "",
  isLoggedIn: false,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state._id = action.payload._id;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isLoading = action.payload.isLoading;
    });
  },
});

// export const { toggleExpandedSidebar } = userSlice.actions;

export default userSlice.reducer;
