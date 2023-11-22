import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchUser = createAsyncThunk("users/me", async () => {
  const token = Cookies.get("toDoUserToken");
  const user = {
    name: "",
    username: "",
    token: "",
    isLoggedIn: false,
    isLoading: false,
    _id: "",
  };
  if (!token) return user;
  try {
    const response = await axios.get("http://localhost:5000/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    return {
      name: data.name,
      username: data.username,
      token,
      isLoggedIn: true,
      isLoading: false,
      _id: data._id,
    };
  } catch (error) {
    console.log("error", error);
    return {
      name: "",
      username: "",
      token: "",
      isLoggedIn: false,
      isLoading: false,
      _id: "",
    };
  }
});
