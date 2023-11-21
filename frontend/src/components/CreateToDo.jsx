import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToDo from "./ToDo";
import { fetchToDo } from "../features/middleware/toDoMiddleware";
import Cookies from "js-cookie";
import axios from "axios";

const CreateToDo = () => {
  const [textArea, setTextArea] = useState("");
  const user = useSelector((state) => state.user);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const handleToDo = async (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) return "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/toDo/",
        {
          username: user.username,
          title: "",
          toDo: textArea,
        },
        { headers }
      );
      // Cookies.set("toDoUserData", res);
      // console.log(Cookies.get("toDoUseData"));
      setErr("");
      setTextArea("");
      dispatch(fetchToDo());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4 border rounded flex gap-4 w-screen max-w-sm flex-col">
      <div className="">Create a New Todo</div>
      <div className="text-lg text-clight">{user.username}</div>
      <form className="flex flex-col gap-4" onSubmit={handleToDo}>
        <textarea
          required
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          cols="30"
          rows={3}
          placeholder="Start writing ..."
          className="bg-sky-100 p-2 min-h-8 resize-y auto-rows-auto  text-sm rounded-xl focus:outline-none"
        />

        <div className="flex gap-4">
          <button
            className=" bg-blue-500 flex-1 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            Add Todo
          </button>
        </div>
        <span className="text-xs text-red-700 indent-1">{err}</span>
      </form>
    </div>
  );
};

export default CreateToDo;
