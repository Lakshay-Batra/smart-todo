import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { List, Task } from "../types/listTypeStore";

// Define action types
type Action =
  | { type: "ADD_TASK"; listId: string; task: Task }
  | { type: "DELETE_TASK"; listId: string; taskId: string }
  | { type: "TOGGLE_TASK"; listId: string; taskId: string }
  | { type: "ADD_LIST"; list: List }
  | { type: "DELETE_LIST"; listId: string }
  | { type: "LOAD_DATA"; locallyStoredData: List[] };

// Define initial state
const initialState: List[] = [];

// Define reducer
const todoReducer = (state: List[], action: Action): List[] => {
  switch (action.type) {
    case "ADD_TASK": {
      const updatedState = state.map((list) =>
        list.id === action.listId
          ? { ...list, tasks: [...list.tasks, action.task] }
          : list
      );
      localStorage.setItem("todoData", JSON.stringify(updatedState));
      return updatedState;
    }

    case "DELETE_TASK": {
      const updatedState = state.map((list) =>
        list.id === action.listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== action.taskId),
            }
          : list
      );
      localStorage.setItem("todoData", JSON.stringify(updatedState));
      return updatedState;
    }

    case "TOGGLE_TASK": {
      const updatedState = state.map((list) =>
        list.id === action.listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === action.taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      );
      localStorage.setItem("todoData", JSON.stringify(updatedState));
      return updatedState;
    }

    case "ADD_LIST": {
      const updatedState = [...state, action.list];
      localStorage.setItem("todoData", JSON.stringify(updatedState));
      return updatedState;
    }

    case "DELETE_LIST": {
      const updatedState = state.filter(({ id }) => action.listId !== id);
      localStorage.setItem("todoData", JSON.stringify(updatedState));
      return updatedState;
    }

    case "LOAD_DATA":
      return [...action.locallyStoredData];

    default: {
      const updatedState = state;
      localStorage.setItem("todoData", JSON.stringify(updatedState));
      return updatedState;
    }
  }
};

// Define context
const TodoContext = createContext<
  | {
      state: List[];
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

// Define provider
const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook for accessing TodoContext
const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export { TodoProvider, useTodoContext };
