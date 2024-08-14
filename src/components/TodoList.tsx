import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import { FaPen, FaStickyNote } from "react-icons/fa"; // Import icons

interface Props {
  todos: Array<Todo>;
  setTodos: (todos: Todo[]) => void;
  CompletedTodos: Array<Todo>;
  setCompletedTodos: (todos: Todo[]) => void;
  InProgressTodos: Array<Todo>;
  setInProgressTodos: (todos: Todo[]) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
  InProgressTodos,
  setInProgressTodos,
}) => {
  return (
    <div className="container">
      {/* Background icons */}
      <FaPen className="background-icon icon-pen" />
      <FaStickyNote className="background-icon icon-note" />

      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos active ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))
            ) : (
              <p>No active tasks</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="InProgressList">
        {(provided, snapshot) => (
          <div
            className={`todos in-progress ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">In Progress Tasks</span>
            {InProgressTodos.length > 0 ? (
              InProgressTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={InProgressTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setInProgressTodos}
                />
              ))
            ) : (
              <p>No in-progress tasks</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos completed ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos.length > 0 ? (
              CompletedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={CompletedTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ))
            ) : (
              <p>No completed tasks</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
