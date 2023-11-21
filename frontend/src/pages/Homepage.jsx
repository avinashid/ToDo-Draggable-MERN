import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const Homepage = () => {
  const user = useSelector((state) => state);
  console.log(user);
  return (
    <div>
      <Header />
      <div className="flex justify-center my-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Homepage;
