import useTodosContext from "../hooks/useTodosContext";
import styles from "./TodoItem.module.css";

const { item, done } = styles;

interface TodoItemProps extends Props {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { id, text, isDone, currentTime } = todo;

  const { removeTodo, toggleTodo } = useTodosContext();

  return (
    <li className={item}>
      <div>
        <span>{currentTime}</span>
        <button type="button" onClick={() => removeTodo(id)}>
          삭제
        </button>
      </div>
      <label className={isDone ? done : undefined}>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => toggleTodo(todo)}
        />
        {text}
      </label>
    </li>
  );
}
