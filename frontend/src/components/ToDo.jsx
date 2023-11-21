import React from "react";

const ToDo = ({ toDo }) => {
  console.log(toDo);
  return <div className="flex flex-col gap-3 border p-3">{toDo.toDo}</div>;
};

export default ToDo;
