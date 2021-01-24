/// <reference types="react-scripts" />

interface Props {
  children?: React.ReactNode;
}

interface Todo {
  id: string;
  text: string;
  isDone: boolean;
  currentTime: string;
}

interface AddTodo {
  (text: string): void;
}

interface EditMode {
  (id: string): void;
}

interface EditTodo {
  (text: string, id: string): void;
}

interface RemoveTodo {
  (id: string): void;
}

interface ToggleTodo {
  (selectedTodo: Todo): void;
}
