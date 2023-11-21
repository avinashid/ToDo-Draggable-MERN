import CreateToDo from "./CreateToDo";
import { useSelector, useDispatch } from "react-redux";
import ToDo from "./ToDo";
import { reOrderList } from "../features/toDoSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ToDoContainer = () => {
  const toDo = useSelector((state) => state.toDo);
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(toDo.toDo);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    dispatch(reOrderList(reorderedItems));
  };

  return (
    <div className="flex flex-col gap-2">
      <CreateToDo />

      {!toDo.isLoading && toDo.toDo.length !==0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {toDo.toDo.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <ToDo key={item._id} toDo={item} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default ToDoContainer;
