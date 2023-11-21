import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/middleware/userMiddleware";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);

  const formData = {
    username: "",
    password: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username: formData.username,
        password: formData.password,
      });

      const data = res.data;
      Cookies.set("toDoUserToken", data.token, { expires: 2 });
      dispatch(fetchUser());
      navigate("/");
    } catch (error) {
      setErr(true);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col p-4 border text-black pb-7 max-w-sm gap-6 rounded-md w-10/12 ">
      <div className="text-4xl">Sign In</div>
      <form className="bg-none flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          required
          type="text"
          autoComplete="off"
          className="bg-sky-100 text-sm p-3 rounded-md"
          onChange={(e) => (formData.username = e.target.value)}
          placeholder="Enter Username"
        />
        <input
          required
          className="bg-sky-100 text-sm p-3 rounded-md"
          type="password"
          onChange={(e) => (formData.password = e.target.value)}
          placeholder="Enter password"
        />
        <button
          className=" bg-transparent border p-3  rounded-md hover:text-white   hover:bg-slate-600"
          type="submit"
        >
          Submit
        </button>
        {err && (
          <div className="text-xs m-auto text-red-600">
            Invalid Username or Password
          </div>
        )}
      </form>
      <div>Create an Account?</div>
      <button
        className=" bg-transparent border p-3 hover:text-white  rounded-md hover:bg-slate-600"
        type="submit"
        onClick={() => navigate("/signin")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
