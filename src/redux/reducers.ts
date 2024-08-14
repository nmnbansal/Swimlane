// src/redux/reducers.ts
import { 
  ADD_TODO, 
  TOGGLE_TODO, 
  EDIT_TODO, 
  DELETE_TODO, 
  TodoActionTypes, 
  SET_TODOS, 
  SET_COMPLETED_TODOS, 
  SET_IN_PROGRESS_TODOS 
} from "./action";

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

interface TodoState {
  todos: Todo[];
  inProgressTodos: Todo[]; // Corrected property name
  completedTodos: Todo[];
}

const initialState: TodoState = {
  todos: [],
  inProgressTodos: [], // Corrected property name
  completedTodos: [],
};

const todoReducer = (state = initialState, action: TodoActionTypes): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
        completedTodos: state.completedTodos.map(todo =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
        inProgressTodos: state.inProgressTodos.map(todo =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo
        ),
        completedTodos: state.completedTodos.map(todo =>
          todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo
        ),
        inProgressTodos: state.inProgressTodos.map(todo =>
          todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        completedTodos: state.completedTodos.filter(todo => todo.id !== action.payload),
        inProgressTodos: state.inProgressTodos.filter(todo => todo.id !== action.payload),
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case SET_COMPLETED_TODOS:
      return {
        ...state,
        completedTodos: action.payload,
      };
    case SET_IN_PROGRESS_TODOS:
      return {
        ...state,
        inProgressTodos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
