
import ToDoContainer from "./ToDoContainer";
import LoadingPopup from "./Loading";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const toDo = useSelector((state) => state.toDo.isLoading);
  return (
    <div className="flex relative justify-center my-10">
      <LoadingPopup isLoading={toDo} />
      <ToDoContainer />
    </div>
  );
};

export default Dashboard;
