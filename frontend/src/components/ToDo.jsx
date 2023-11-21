import { useDispatch } from "react-redux";
import { markToDo } from "../features/toDoSlice";
const ToDo = ({ toDo }) => {
  console.log(toDo);
  const dispatch = useDispatch();
  const markToDoHandle = () => {
    dispatch(markToDo(toDo._id));
  };
  return (
    <div className="flex  gap-3 border p-3">
      <input type="checkbox" checked={toDo.markToDo} onChange={markToDoHandle} />
      <div className={`${toDo.markToDo && "line-through text-gray-500"}`}>
        {toDo.toDo}
      </div>
    </div>
  );
};

export default ToDo;
