import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/middleware/userMiddleware";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  console.log(user);

  const handleSignOut = () => {
    Cookies.set("toDoUserToken", "");
    dispatch(fetchUser());
  };
  const button = user.isLoggedIn ? (
    <div onClick={handleSignOut}>Sign Out</div>
  ) : (
    <div onClick={() => navigate("signin")}>Sign In</div>
  );
  return (
    <div className="flex px-4 py-3 mx-2 justify-between items-center rounded-md border-b-gray shadow-xl border-b ">
      <div
        className="text-xl font-semibold font-bold cursor-pointer bg-gradient-to-r from-rose-700 to-blue-600 bg-clip-text text-transparent"
        onClick={() => navigate("/")}
      >
        Todo App
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col relative top-1 ">
          <div className="absolute text-white  z-10 text-sm bg-slate-600 text-cblack rounded-md px-2 bottom-7 right-16">
            {user.username || "Guest"}
          </div>
          <button className=" bg-transparent text-black hover:bg-slate-700 hover:text-white font-semibold py-1 px-4 border border-gray-400 rounded shadow">
            {button}
          </button>
        </div>
        {!user.isLoggedIn && (
          <button
            onClick={() => navigate("signup")}
            className=" mt-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
