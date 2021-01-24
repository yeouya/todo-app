import useTodosContext from "../hooks/useTodosContext";
import useInput from "../hooks/useInput";
import { FormEvent } from "react";
import styles from "./TodoForm.module.css";

export default function TodoForm() {
  const { addTodo } = useTodosContext();

  const [text, setText, bindText] = useInput();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimText = text.trim();
    if (!trimText) {
      return;
    }
    addTodo(trimText);
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        title="오늘 할 일"
        placeholder="오늘 할 일은..."
        autoFocus
        required
        {...bindText}
      />
      <button className={styles.button} type="submit">
        추가
      </button>
    </form>
  );
}
