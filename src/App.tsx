// App.tsx
import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/reducer";
import { addTodo, setTodos, setCompletedTodos, setInProgressTodos } from "./redux/action";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const completedTodos = useSelector((state: RootState) => state.todos.completedTodos);
  const inProgressTodos = useSelector((state: RootState) => state.todos.inProgressTodos);

  const [todo, setTodo] = React.useState<string>("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch(addTodo(Date.now(), todo, false));
      setTodo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
  
    // Exit if there's no destination
    if (!destination) {
      return;
    }
  
    // Exit if the item is dropped at the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    // Clone the current state arrays
    let active = [...todos];
    let complete = [...completedTodos];
    let inProgress = [...inProgressTodos];
  
    // Identify the item being moved
    let movedItem: Todo;
    if (source.droppableId === "TodosList") {
      movedItem = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "InProgressList") {
      movedItem = inProgress[source.index];
      inProgress.splice(source.index, 1);
    } else {
      movedItem = complete[source.index];
      complete.splice(source.index, 1);
    }
  
    // Handle item placement based on destination droppableId
    switch (destination.droppableId) {
      case "TodosList":
        // Move only if item is coming from InProgressList or CompletedList
        if (source.droppableId === "InProgressList" || source.droppableId === "CompletedList") {
          active.splice(destination.index, 0, movedItem);
        } else {
          // If the item is being moved from TodosList, reject the move
          active.splice(source.index, 0, movedItem);
        }
        break;
      case "InProgressList":
        // Move only if item is coming from TodosList or CompletedList
        if (source.droppableId === "TodosList" || source.droppableId === "CompletedList") {
          inProgress.splice(destination.index, 0, movedItem);
        } else {
          // If the item is being moved from InProgressList, reject the move
          inProgress.splice(source.index, 0, movedItem);
        }
        break;
      case "TodosRemove":
        // Move only if item is coming from InProgressList
        if (source.droppableId === "InProgressList") {
          complete.splice(destination.index, 0, movedItem);
        } else {
          // If the item is being moved from TodosList or CompletedList, reject the move
          if (source.droppableId === "TodosList") {
            active.splice(source.index, 0, movedItem);
          } else {
            complete.splice(source.index, 0, movedItem);
          }
        }
        break;
      default:
        break;
    }
  
    // Update the state with the new lists
    dispatch(setTodos(active));
    dispatch(setInProgressTodos(inProgress));
    dispatch(setCompletedTodos(complete));
  };
  
  
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task Management App</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={(newTodos: Todo[]) => dispatch(setTodos(newTodos))}
          CompletedTodos={completedTodos}
          setCompletedTodos={(newCompletedTodos: Todo[]) => dispatch(setCompletedTodos(newCompletedTodos))}
          InProgressTodos={inProgressTodos}
          setInProgressTodos={(newInProgressTodos: Todo[]) => dispatch(setInProgressTodos(newInProgressTodos))}
        />

      </div>
    </DragDropContext>
  );
};

export default App;
