import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const Homepage = () => {
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
