import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
export const fetchToDo = createAsyncThunk("posts/me", async () => {
  const token = Cookies.get("toDoUserToken");
  if (!token)
    return { isLoading: false, toDo: Cookies.get("toDoUserData") || [] };

  const toDo = {
    isLoading: false,
    toDo: [],
  };
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get("http://localhost:5000/api/users/me", {
      headers,
    });
    const userData = res.data;

    if (userData.username) {
      const response = await axios.post(
        "http://localhost:5000/api/toDo/me",
        {
          username: userData.username,
        },
        { headers }
      );
      const data = response.data;
      return {
        isLoading: false,
        toDo: data,
      };
    }
  } catch (error) {
    console.log("error", error);
    return toDo;
  }
});
