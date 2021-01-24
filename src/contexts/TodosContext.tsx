import { Dispatch, SetStateAction, createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodoItem } from "../classes";

interface DefaultValue {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  addTodo: AddTodo;
  removeTodo: RemoveTodo;
  toggleTodo: ToggleTodo;
}

export const TodosContext = createContext<DefaultValue | null>(null);

export default function TodosProvider({ children }: Props) {
  const initialTodos = JSON.parse(localStorage.getItem("todos") || "[]");

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  useLocalStorage("todos", JSON.stringify(todos));

  const addTodo: AddTodo = (text) => {
    const newTodo = new TodoItem(text);
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  };

  const removeTodo: RemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodo: ToggleTodo = (selectedTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        const { isDone } = selectedTodo;
        const newTodo = { ...todo, isDone: !isDone };
        return newTodo;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const value = { todos, setTodos, addTodo, removeTodo, toggleTodo };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}
