import {
  Dispatch,
  SetStateAction,
  RefObject,
  createContext,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodoItem } from "../classes";

interface DefaultValue {
  todos: Todo[];
  edit: Todo | undefined;
  input: RefObject<HTMLInputElement> | undefined;
  setInput: Dispatch<SetStateAction<RefObject<HTMLInputElement> | undefined>>;
  addTodo: AddTodo;
  editMode: EditMode;
  editTodo: EditTodo;
  removeTodo: RemoveTodo;
  toggleTodo: ToggleTodo;
}

export const TodosContext = createContext<DefaultValue | null>(null);

export default function TodosProvider({ children }: Props) {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos");
  const [edit, setEdit] = useState<Todo>();
  const [input, setInput] = useState<RefObject<HTMLInputElement>>();

  const addTodo: AddTodo = (text) => {
    const newTodo = new TodoItem(text);
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  };

  const editMode: EditMode = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    input?.current?.focus();
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
    input,
    setInput,
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
