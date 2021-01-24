import useTodosContext from "../hooks/useTodosContext";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const { item, head, button, body, checkbox, done } = styles;

interface TodoItemProps extends Props {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { id, text, isDone, currentTime } = todo;

  const { editMode, removeTodo, toggleTodo } = useTodosContext();

  return (
    <li className={item}>
      <header className={head}>
        <span>{currentTime}</span>
        <span>
          <button className={button} type="button" onClick={() => editMode(id)}>
            <FaPen color="white" />
          </button>
          <button
            className={button}
            type="button"
            onClick={() => removeTodo(id)}
          >
            <FaTrashAlt color="white" />
          </button>
        </span>
      </header>
      <label className={`${body} ${isDone ? done : undefined}`}>
        <input
          className={checkbox}
          type="checkbox"
          checked={isDone}
          onChange={() => toggleTodo(todo)}
        />
        {text}
      </label>
    </li>
  );
}
