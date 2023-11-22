import { useEffect, useState } from "react";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import { fetchUser } from "./features/middleware/userMiddleware";
import { fetchToDo } from "./features/middleware/toDoMiddleware";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const router = createHashRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Cookies.set("toDoUserData", "");
    dispatch(fetchUser());
    dispatch(fetchToDo());
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
