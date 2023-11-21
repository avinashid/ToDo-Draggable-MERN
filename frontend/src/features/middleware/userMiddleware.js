import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchUser = createAsyncThunk("users/me", async () => {
  const token = Cookies.get("toDoUserToken");
  console.log(token)
  const user = {
    name: "",
    username: "",
    token: "notoken",
    isLoggedIn: false,
    isLoading: false,
  };

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
    };
  } catch (error) {
    console.log("error", error);
    return {
      name: "",
      username:"",
      token:"",
      isLoggedIn: false,
      isLoading: false,
    };
  }
});
