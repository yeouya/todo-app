import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodoItem } from "../classes";

interface DefaultValue {
  todos: Todo[];
  edit: Todo | undefined;
  addTodo: AddTodo;
  editMode: EditMode;
  editTodo: EditTodo;
  removeTodo: RemoveTodo;
  toggleTodo: ToggleTodo;
}

export const TodosContext = createContext<DefaultValue | null>(null);

export default function TodosProvider({ children }: Props) {
  const initialTodos = JSON.parse(localStorage.getItem("todos") || "[]");

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [edit, setEdit] = useState<Todo | undefined>(undefined);

  useLocalStorage("todos", JSON.stringify(todos));

  const addTodo: AddTodo = (text) => {
    const newTodo = new TodoItem(text);
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  };

  const editMode: EditMode = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEdit(todo);
  };

  const editTodo: EditTodo = (text, id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        const editedTodo = new TodoItem(text);
        return editedTodo;
      }
      return todo;
    });
    setTodos(newTodos);
    setEdit(undefined);
  };

  const removeTodo: RemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    if (edit !== undefined && edit.id === id) {
      setEdit(undefined);
    }
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

  const value = {
    todos,
    edit,
    addTodo,
    editMode,
    editTodo,
    removeTodo,
    toggleTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}
