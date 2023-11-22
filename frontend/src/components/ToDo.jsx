import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

import { markToDo, deleteToDo } from "../features/toDoSlice";

const ToDo = ({ toDo }) => {

  const dispatch = useDispatch();

  const markToDoHandle = () => {
    dispatch(markToDo(toDo._id));
  };

  const handleDelete = () => {
    dispatch(deleteToDo(toDo._id));
  };

  return (
    <div className="flex flex-1 justify-between max-w-sm overflow-clip shadow-md border p-3">
      <div className="flex gap-4 ">
        <input
          type="checkbox"
          checked={toDo.markToDo}
          onChange={markToDoHandle}
          className="w-4 "
        />
        <div className={`${toDo.markToDo && "line-through text-gray-500"}`}>
          <div className="max-w-sm break-all text-justify">{toDo.toDo}</div>
        </div>
      </div>
      <div onClick={handleDelete} className="text-2xl hover:text-red-700 px-4">
        <MdDelete />
      </div>
    </div>
  );
};

export default ToDo;
