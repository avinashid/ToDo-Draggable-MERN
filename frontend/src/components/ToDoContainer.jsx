import React from "react";
import CreateToDo from "./CreateToDo";
import { useSelector } from "react-redux";
import ToDo from "./ToDo";

const ToDoContainer = () => {
  const toDo = useSelector((state) => state.toDo);
  return (
    <div className="flex flex-col gap-2">
      <CreateToDo />
      {!toDo.isLoading &&
        toDo.toDo.map((e, index, array) => (
          <ToDo key={e._id} toDo={array[array.length - 1 - index]} />
        ))}
    </div>
  );
};

export default ToDoContainer;
